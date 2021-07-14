module Lookbook
  class BrowserController < ActionController::Base
    protect_from_forgery with: :exception
    prepend_view_path File.expand_path("../../views/lookbook", __dir__)
    
    helper Lookbook::Engine.helpers
    layout "layouts/app"

    before_action :assign_previews
    before_action :find_preview, only: :preview
    before_action :find_example, only: :preview
    before_action :assign_navigation

    def index
    end

    def preview
      @path = params[:path]
      if @preview.present? && @preview.examples.include?(@example_name)
        @render_args = @preview.render_args(@example_name, params: params.permit!)
        @output = render_component_to_string(@render_args[:template], @render_args[:locals])
        if @render_args[:template] == "view_components/preview"
          @source = @preview.preview_method_source(@example_name)
          @source_lang = "Ruby"
        else
          @source = @preview.preview_template_source(@render_args[:template])
          template_path = @preview.preview_example_template_full_path(@render_args[:template])
          @source_lang = File.extname(template_path).sub(".", "")
        end
        assign_comment
        assign_info_panes
      else
        render "browser/not_found"
      end
    end

    private

    def render_component_to_string(template, locals)
      prepend_view_path(ViewComponent::Base.preview_paths)
      opts = {}
      opts[:layout] = false
      opts[:locals] = locals if locals.present?
      render_to_string template, opts
    end

    def assign_comment
      comment_text = @preview.preview_comment(@example_name)
      comment = Lookbook::Comment.new(comment_text)
      @comment = comment.to_html
    end

    def assign_previews
      @previews = ViewComponent::Preview.all
    end

    def assign_navigation
      nav = Lookbook::Navigation.new(@previews, params[:path])
      @nav = {
        nested: nav.nested,
        flat: nav.flat
      }
    end

    def assign_info_panes
      @info = {
        source: {
          label: "Source <span class='ml-1 text-gray-400'>(#{@source_lang})<span>",
          content: @source || "",
          template: "partials/panes/code",
          lang: @source_lang.downcase
        },
        output: { 
          label: "Output <span class='ml-1 text-gray-400'>(HTML)<span>",
          content: @output || "",
          template: "partials/panes/code",
          lang: "html"
        },
        comments: {
          label: "Notes",
          content: @comment.blank? ? "<em class='text-gray-400'>No comments provided.</em>".html_safe : @comment,
          template: "partials/panes/prose",
          disabled: @comment.blank?
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
    
  end
end
