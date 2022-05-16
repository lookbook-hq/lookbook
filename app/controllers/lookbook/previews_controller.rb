module Lookbook
  class PreviewsController < ApplicationController
    layout "lookbook/inspector"

    def self.controller_path
      "lookbook/previews"
    end

    before_action :lookup_entities, only: [:preview, :show]
    before_action :set_title

    def preview
      if @example
        set_params
        begin
          render html: render_examples(examples_data)
        rescue => exception
          render_in_layout "lookbook/error",
            layout: "lookbook/standalone",
            error: prettify_error(exception)
        end
      else
        show_404 layout: "lookbook/standalone"
      end
    end

    def show
      if @example
        begin
          set_params
          @rendered_examples = examples_data
          @drawer_panels = drawer_panels.filter { |name, panel| panel[:show] }
          @preview_panels = preview_panels.filter { |name, panel| panel[:show] }
        rescue => exception
          render_in_layout "lookbook/error", layout: "lookbook/inspector", error: prettify_error(exception)
        end
      else
        show_404
      end
    end

    def show_legacy
      Lookbook.logger.warn("Legacy URL path detected. These paths are deprecated and will be removed in a future version")
      redirect_to inspect_path params[:path]
    end

    private

    def lookup_entities
      @example = Lookbook.previews.find_example(params[:path])
      if @example.present?
        @preview = @example.preview
        if params[:path] == @preview&.lookup_path
          redirect_to inspect_path "#{params[:path]}/#{@preview.default_example.name}"
        end
      else
        @preview = Lookbook.previews.find(params[:path])
        if @preview.present?
          first_example = @preview.examples.first
          redirect_to inspect_path(first_example.lookup_path) if first_example
        else
          @preview = Lookbook.previews.find(path_segments.slice(0, path_segments.size - 1).join("/"))
        end
      end
    end

    def show_404(layout: nil)
      locals = if @preview
        {
          message: "Example not found",
          description: "The '#{@preview.label}' preview does not have an example named '#{path_segments.last}'."
        }
      else
        {
          message: "Not found",
          description: "Looked for '#{params[:path]}'.<br>The preview may have been renamed or deleted."
        }
      end
      render_in_layout "lookbook/404", layout: layout, **locals
    end

    def set_title
      @title = @example.present? ? [@example&.label, @preview&.label].compact.join(" :: ") : "Not found"
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
        html: preview_controller.process(:render_example_to_string, @preview, example.name),
        source: has_template ? example.template_source(render_args[:template]) : example.method_source,
        source_lang: has_template ? example.template_lang(render_args[:template]) : example.source_lang,
        params: example.params
      }
    end

    def render_examples(examples)
      opts = {layout: @preview.layout}
      if params[:lookbook_embed] == "true"
        opts[:append_html] = "<script src=\"/lookbook-assets/js/embed.js?v=#{Lookbook.version}\"></script>".html_safe
      end
      preview_controller.process(:render_in_layout_to_string, "lookbook/preview", {examples: examples}, **opts)
    end

    def set_params
      # cast known params to type
      @example.params.each do |param|
        if preview_controller.params.key?(param[:name])
          preview_controller.params[param[:name]] = Lookbook::Params.cast(preview_controller.params[param[:name]], param[:type])
        end
      end

      # set display params
      preview_controller.params.merge!({
        lookbook: {
          display: @example.display_params
        }
      })
    end

    def preview_panels
      {
        preview: {
          id: "preview-panel-preview",
          label: "Preview",
          template: "lookbook/previews/panels/preview",
          hotkey: "v",
          show: true,
          disabled: false,
          copy: false
        },
        output: {
          id: "preview-panel-html",
          label: "HTML",
          template: "lookbook/previews/panels/output",
          hotkey: "h",
          show: true,
          disabled: false,
          copy: false
        }
      }
    end

    def drawer_panels
      {
        source: {
          id: "drawer-panel-source",
          label: "Source",
          template: "lookbook/previews/panels/source",
          hotkey: "s",
          show: true,
          disabled: false,
          copy: @rendered_examples.map { |e| e[:source] }.join("\n")
        },
        notes: {
          id: "drawer-panel-notes",
          label: "Notes",
          template: "lookbook/previews/panels/notes",
          hotkey: "n",
          show: true,
          copy: false,
          disabled: @rendered_examples.filter { |e| e[:notes].present? }.none?
        },
        params: {
          id: "drawer-panel-params",
          label: "Params",
          template: "lookbook/previews/panels/params",
          hotkey: "p",
          show: true,
          disabled: @example.type == :group || @example.params.none?,
          copy: false
        }
      }
    end

    def preview_controller
      return @preview_controller if @preview_controller
      controller = Lookbook::Engine.preview_controller.new
      controller.request = request
      controller.response = response
      @preview_controller ||= controller
    end

    def prettify_error(exception)
      error_params = if exception.is_a?(ViewComponent::PreviewTemplateError)
        {
          file_path: @preview&.full_path,
          line_number: 0,
          source_code: @example&.source
        }
      elsif exception.is_a?(ActionView::Template::Error) & exception.message.include?("implements a reserved method")
        message_parts = exception.message.split("\n").first.split
        component_class = message_parts.first.constantize
        naughty_method = message_parts.last.delete("#").delete("`").delete(".")
        method = component_class.instance_method(naughty_method.to_sym)
        if method
          {
            file_path: method.source_location.first,
            line_number: method.source_location[1]
          }
        end
      end
      Lookbook::Error.new(exception, **(error_params || {}))
    end

    def path_segments
      params[:path].split("/")
    end
  end
end
