require "htmlbeautifier"

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
    before_action :initialize_inspector, only: [:show]

    def preview
      if @example
        render html: rendered_example
      else
        render "app/not_found"
      end
    end

    def show
      if @example
        begin
          @rendered_example = rendered_example.gsub("\"", "&quot;")
          (@example.type == :group ? @example.examples : [@example]).each do |example|
            include_example_data(example)
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

    def initialize_inspector
      @source = []
      @output = []
      @notes = []
    end

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

    def include_example_data(example)
      content = HtmlBeautifier.beautify(preview_controller.render_example_to_string(@preview, example.name))
      @output << {
        label: "<!-- #{example.label} -->",
        content: content,
        lang: Lookbook::Lang.find(:html)
      }
      render_args = @preview.render_args(example.name, params: preview_controller.params.permit!)
      has_template = render_args[:template] != "view_components/preview"
      @source << {
        label: has_template ? "<!-- #{example.label} -->" : "\# #{example.label}",
        content: has_template ? example.template_source(render_args[:template]) : example.method_source,
        lang: has_template ? example.template_lang(render_args[:template]) : example.source_lang
      }
      if example.notes.present?
        @notes << {
          label: example.label,
          content: example.notes
        }
      end
    end

    def rendered_example
      if @example.type == :group
        examples = @example.examples.map do |example|
          {
            label: example.label,
            html: preview_controller.render_example_to_string(@preview, example.name)
          }
        end
        joined = render_to_string "./preview_group", locals: {examples: examples}, layout: nil
        preview_controller.render_in_layout_to_string(joined, @preview.lookbook_layout)
      else
        preview_controller.request.params[:path] = "#{@preview.preview_name}/#{@example.name}".chomp("/")
        preview_controller.process(:previews)
      end
    end

    def assign_inspector
      @inspector = {
        panes: {
          source: {
            label: "Source",
            template: "code",
            hotkey: "s",
            items: @source,
            clipboard: @source.map { |s| @source.many? ? "#{s[:label]}\n#{s[:content]}" : s[:content] }.join("\n\n")
          },
          output: {
            label: "Output",
            template: "code",
            hotkey: "o",
            items: @output,
            clipboard: @output.map { |o| @output.many? ? "#{o[:label]}\n#{o[:content]}" : o[:content] }.join("\n\n")
          },
          notes: {
            label: "Notes",
            template: "notes",
            hotkey: "n",
            items: @notes,
            disabled: @notes.none?
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
