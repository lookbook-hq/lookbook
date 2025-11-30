module Lookbook
  class ApplicationController < ActionController::Base
    content_security_policy(false) if respond_to?(:content_security_policy)

    protect_from_forgery with: :exception

    before_action :disable_annotations
    after_action :restore_annotations

    before_action :assign_theme_overrides

    helper_method :fetch_request?

    rescue_from ActionController::RoutingError do |err|
      raise Lookbook::RoutingError, err.message, original: err
    end
    rescue_from StandardError, with: :handle_error

    def index
      redirect_to lookbook_specs_path
    end

    def not_found
      raise_not_found
    end

    protected

    def disable_annotations
      return unless ActionView::Base.respond_to?(:annotate_rendered_view_with_filenames)

      @original_annotations_value = ActionView::Base.annotate_rendered_view_with_filenames
      ActionView::Base.annotate_rendered_view_with_filenames = false
    end

    def restore_annotations
      return if @original_annotations_value.nil?

      ActionView::Base.annotate_rendered_view_with_filenames = @original_annotations_value
      @original_annotations_value = nil
    end

    def assign_theme_overrides
      @theme_overrides ||= Engine.theme.to_css
    end

    def raise_not_found(message = "Page not found")
      raise Lookbook::RoutingError, message
    end

    def handle_error(err)
      raise err if Lookbook.config.preview_disable_error_handling

      @error = err.is_a?(Lookbook::Error) ? err : Lookbook::Error.new(original: err)
      @status_code = get_status_code(err)

      view = (@status_code == :not_found) ? "not_found" : "default"
      layout = current_layout || "lookbook/skeleton"

      render "lookbook/errors/#{view}", layout: layout, status: @status_code
    end

    def current_layout
      self.class.send(:_layout)
    end

    def requested_layout
      layout_header_value = request.headers["HTTP_X_LOOKBOOK_LAYOUT"]
      if layout_header_value.present?
        (layout_header_value == "none") ? false : layout_header_value
      end
    end

    def fetch_request?
      request.headers["HTTP_X_LOOKBOOK_REQUEST"]
    end

    def sidebar_panels
      panels_config = Lookbook.config.preview_inspector.sidebar_panels.map(&:to_sym)
      panels_config.select do |panel|
        (panel == :pages && Engine.pages.any?) || (panel == :previews && Engine.previews.any?)
      end
    end

    def get_status_code(err)
      if err.respond_to?(:status)
        err.status
      else
        status_map = ActionDispatch::ExceptionWrapper.rescue_responses
        status_map.fetch(err.class.name, :internal_server_error)
      end
    end
  end
end
