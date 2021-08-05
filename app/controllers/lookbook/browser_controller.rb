module Lookbook
  class BrowserController < ActionController::Base
    protect_from_forgery with: :exception
    prepend_view_path File.expand_path("../../views/lookbook", __dir__)
    
    layout "layouts/app"

    before_action :assign_previews
    before_action :find_preview, only: [:preview, :show]
    before_action :find_example, only: [:preview, :show]
    before_action :assign_navigation
 
    def index
    end

    def preview
      if example_exists?
        render html: preview_controller.process(:previews)
      end
    end

    def show 
      @path = params[:path]
      if example_exists?
        @example = @preview.get_example(@example_name)
        @render_args = @preview.render_args(@example_name, params: params.permit!)
        @output = preview_controller.render_component_to_string(@preview, @example_name)
        if @render_args[:template] == "view_components/preview"
          @source = @example.method_source
          @source_lang = "Ruby"
        else
          @source = @example.template_source(@render_args[:template])
          @source_lang = @example.template_lang(@render_args[:template])
        end
        assign_info_panes
      else
        render "browser/not_found"
      end
    end

    private

    def example_exists?
      @preview.present? && @preview.examples.include?(@example_name)
    end

    def assign_previews
      @previews = ViewComponent::Preview.all
    end

    def assign_navigation
      @nav = {
        nested: Lookbook::Navigation.nested,
        flat: Lookbook::Navigation.flat
      }
    end

    def assign_info_panes
      @info = {
        source: {
          label: "Source <span class='ml-1 text-gray-400'>(#{@source_lang})<span>",
          content: @source || "",
          template: "partials/panes/code",
          lang: @source_lang.downcase,
          clipboard: @source || ""
        },
        output: { 
          label: "Output <span class='ml-1 text-gray-400'>(HTML)<span>",
          content: @output || "",
          template: "partials/panes/code",
          lang: "html",
          clipboard: @output || ""
        },
        notes: {
          label: "Notes",
          content: @example.notes.blank? ? "<em class='text-gray-400'>No comments provided.</em>".html_safe : @example.notes,
          template: "partials/panes/prose",
          disabled: @example.notes.blank?
        }
      }
    end

    def find_example
      if @preview
        @example_name = params[:path] == @preview.preview_name ? @preview.unsorted_examples.first : File.basename(params[:path])
      end
    end

    def find_preview
      candidates = []
      params[:path].to_s.scan(%r{/|$}) { candidates << $` }
      preview = candidates.detect { |candidate| ViewComponent::Preview.exists?(candidate) }

      if preview
        @preview = ViewComponent::Preview.find(preview)
      end
    end

    def preview_controller
      controller_class = Lookbook.config.preview_controller.constantize
      controller_class.class_eval { include Lookbook::PreviewController }
      controller = controller_class.new
      controller.request = request
      controller.response = response
      controller
    end
  end
end
