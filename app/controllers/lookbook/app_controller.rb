module Lookbook
  class AppController < ActionController::Base
    EXCEPTIONS = [ViewComponent::PreviewTemplateError, ViewComponent::ComponentError, ViewComponent::TemplateError, ActionView::Template::Error]

    protect_from_forgery with: :exception
    helper Lookbook::ApplicationHelper

    before_action :find_preview, only: [:preview, :show]
    before_action :find_example, only: [:preview, :show]
    before_action :build_nav

    def self.controller_path
      "lookbook"
    end

    def preview
      if @example
        set_params
        render html: render_examples(examples_data)
      else
        render "not_found"
      end
    end

    def show
      if @example
        begin
          set_params
          @examples = examples_data
          @preview_srcdoc = if Lookbook.config.preview_srcdoc
            render_examples(examples_data).gsub("\"", "&quot;")
          end
          @panels = panels.filter { |name, panel| panel[:show] }
        rescue *EXCEPTIONS
          render "error"
        end
      else
        render "not_found"
      end
    end

    private

    def find_preview
      candidates = []
      params[:path].to_s.scan(%r{/|$}) { candidates << $` }
      match = candidates.reverse.detect { |candidate| Lookbook::Preview.exists?(candidate) }
      @preview = match ? Lookbook::Preview.find(match) : nil
    end

    def find_example
      @example = if @preview
        if params[:path] == @preview.lookbook_path
          redirect_to show_path "#{params[:path]}/#{@preview.lookbook_examples.first.name}"
        else
          @example_name = File.basename(params[:path])
          @preview.lookbook_example(@example_name)
        end
      end
    end

    def examples_data
      @examples_data ||= (@example.type == :group ? @example.examples : [@example]).map do |example|
        example_data(example)
      end
    end

    def example_data(example)
      render_args = @preview.render_args(example.name, params: preview_controller.params.permit!)
      has_template = render_args[:template] != "view_components/preview"
      {
        label: example.label,
        notes: example.notes,
        html: preview_controller.render_example_to_string(@preview, example.name),
        source: has_template ? example.template_source(render_args[:template]) : example.method_source,
        source_lang: has_template ? example.template_lang(render_args[:template]) : example.source_lang,
        params: enabled?(:params) ? example.params : []
      }
    end

    def render_examples(examples)
      preview_controller.render_in_layout_to_string("layouts/lookbook/preview", {examples: examples}, @preview.lookbook_layout)
    end

    def set_params
      if enabled?(:params)
        # cast known params to type
        @example.params.each do |param|
          if preview_controller.params.key?(param[:name])
            preview_controller.params[param[:name]] = Lookbook::Params.cast(preview_controller.params[param[:name]], param[:type])
          end
        end
      end
      # set display params
      preview_controller.params.merge!({
        lookbook: {
          display: @example.display_params
        }
      })
    end

    def build_nav
      @nav = Collection.new
      previews.reject { |p| p.hidden? }.each do |preview|
        current = @nav
        if preview.hierarchy_depth == 1
          current.add(preview)
        else
          preview.lookbook_parent_collections.each.with_index(1) do |name, i|
            target = current.get_or_create(name)
            if preview.hierarchy_depth == i + 1
              target.add(preview)
            else
              current = target
            end
          end
        end
      end
      @nav
    end

    def panels
      {
        source: {
          label: "Source",
          template: "lookbook/panels/source",
          hotkey: "s",
          show: true,
          disabled: false,
          copy: true
        },
        output: {
          label: "Output",
          template: "lookbook/panels/output",
          hotkey: "o",
          show: true,
          disabled: false,
          copy: true
        },
        notes: {
          label: "Notes",
          template: "lookbook/panels/notes",
          hotkey: "n",
          show: true,
          disabled: @examples.filter { |e| e[:notes].present? }.none?
        },
        params: {
          label: "Params",
          template: "lookbook/panels/params",
          hotkey: "p",
          show: enabled?(:params),
          disabled: @example.type == :group || @example.params.none?
        }
      }
    end

    def previews
      Lookbook::Preview.all.sort_by(&:label)
    end

    def preview_controller
      return @preview_controller if @preview_controller.present?
      controller_class = Lookbook.config.preview_controller.constantize
      controller_class.class_eval { include Lookbook::PreviewController }
      controller = controller_class.new
      controller.request = request
      controller.response = response
      @preview_controller ||= controller
    end

    def enabled?(feature)
      Lookbook::Features.enabled?(feature)
    end
  end
end
