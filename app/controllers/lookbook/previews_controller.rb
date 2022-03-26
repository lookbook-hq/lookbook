module Lookbook
  class PreviewsController < ApplicationController
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
          render_in_layout "lookbook/error", layout: "lookbook/basic", error: exception, disable_header: true
        end
      else
        render_in_layout "not_found"
      end
    end

    def show
      if @example
        begin
          set_params
          @examples = examples_data
          @drawer_panels = drawer_panels.filter { |name, panel| panel[:show] }
          @preview_panels = preview_panels.filter { |name, panel| panel[:show] }
        rescue => exception
          render_in_layout "lookbook/error", error: exception
        end
      else
        render_in_layout "not_found"
      end
    end

    private

    def lookup_entities
      @example = Lookbook.previews.find_example(params[:path])
      if @example
        @preview = @example.preview
        if params[:path] == @preview&.lookup_path
          redirect_to show_path "#{params[:path]}/#{@preview.default_example.name}"
        end
      end
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
        html: preview_controller.render_example_to_string(@preview, example.name),
        source: has_template ? example.template_source(render_args[:template]) : example.method_source,
        source_lang: has_template ? example.template_lang(render_args[:template]) : example.source_lang,
        params: example.params
      }
    end

    def render_examples(examples)
      preview_controller.render_in_layout_to_string("layouts/lookbook/preview", {examples: examples}, @preview.layout)
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
          label: "Preview",
          template: "lookbook/previews/panels/preview",
          srcdoc: Lookbook.config.preview_srcdoc ? render_examples(examples_data).gsub("\"", "&quot;") : nil,
          hotkey: "v",
          show: true,
          disabled: false,
          copy: false
        },
        output: {
          label: "HTML",
          template: "lookbook/previews/panels/output",
          hotkey: "o",
          show: true,
          disabled: false,
          copy: true
        }
      }
    end

    def drawer_panels
      {
        source: {
          label: "Source",
          template: "lookbook/previews/panels/source",
          hotkey: "s",
          show: true,
          disabled: false,
          copy: true
        },
        notes: {
          label: "Notes",
          template: "lookbook/previews/panels/notes",
          hotkey: "n",
          show: true,
          disabled: @examples.filter { |e| e[:notes].present? }.none?
        },
        params: {
          label: "Params",
          template: "lookbook/previews/panels/params",
          hotkey: "p",
          show: true,
          disabled: @example.type == :group || @example.params.none?
        }
      }
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

    def render_in_layout(path, layout: nil, **locals)
      render path, layout: layout.presence || (params[:lookbook_embed] ? "lookbook/basic" : "lookbook/application"), locals: locals
    end
  end
end
