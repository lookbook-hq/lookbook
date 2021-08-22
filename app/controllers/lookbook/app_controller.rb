module Lookbook
  class AppController < ActionController::Base
    EXCEPTIONS = [ViewComponent::PreviewTemplateError, ViewComponent::ComponentError, ViewComponent::TemplateError, ActionView::Template::Error]

    protect_from_forgery with: :exception
    prepend_view_path File.expand_path("../../views/lookbook", __dir__)

    layout "layouts/app"
    helper Lookbook::Engine.helpers

    before_action :find_preview, only: [:preview, :show]
    before_action :find_example, only: [:preview, :show]
    before_action :assign_nav, only: [:index, :show]

    def index
    end

    def preview
      if @example
        render html: preview_output
      else
        render "app/not_found"
      end
    end

    def show
      if @example
        begin
          @preview_srcdoc = preview_output.gsub("\"", "&quot;")
          @render_args = @preview.render_args(@example.name, params: preview_controller.params.permit!)
          @render_output = preview_controller.render_component_to_string(@preview, @example_name)
          @render_output_lang = Lookbook::Lang.find(:html)
          if using_preview_template?
            @source = @example.method_source
            @source_lang = @example.source_lang
          else
            @source = @example.template_source(@render_args[:template])
            @source_lang = @example.template_lang(@render_args[:template])
          end
          assign_inspector
        rescue *EXCEPTIONS
          render "app/error"
        end
      else
        render "app/not_found"
      end
    end

    private

    def find_preview
      candidates = []
      params[:path].to_s.scan(%r{/|$}) { candidates << $` }
      match = candidates.detect { |candidate| Lookbook::Preview.exists?(candidate) }
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

    def using_preview_template?
      @render_args[:template] == "view_components/preview"
    end

    def preview_output
      @preview_output ||= if @preview
        preview_controller.request.params[:path] = "#{@preview.preview_name}/#{@example.name}".chomp("/")
        preview_controller.process(:previews)
      end
    end

    def assign_inspector
      @inspector = {
        panes: {
          source: {
            label: "Source",
            content: @source || "",
            template: "code",
            lang: @source_lang,
            clipboard: @source
          },
          output: {
            label: "Output",
            content: @render_output || "",
            template: "code",
            lang: @render_output_lang,
            clipboard: @render_output
          },
          notes: {
            label: "Notes",
            content: @example.notes.presence || "<em class='opacity-50'>No notes provided.</em>",
            template: "prose",
            disabled: @example.notes.blank?
          }
        }
      }
    end

    def assign_nav
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

    def previews
      Lookbook::Preview.all
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
  end
end
