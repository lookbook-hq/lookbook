module Lookbook
  class ApplicationController < ActionController::Base
    include Configurable
    include Rescuable
    include WithViewAnnotations

    content_security_policy(false) if respond_to?(:content_security_policy)
    protect_from_forgery with: :exception

    helper_method :fetch_request?

    def index
      if Lookbook.previews.any?
        redirect_to lookbook_specs_path
      else
        render "lookbook/start"
      end
    end

    def not_found
      raise_not_found
    end

    protected

    def fetch_request?
      request.headers["HTTP_X_LOOKBOOK_REQUEST"]
    end

    def raise_not_found(message = "Page not found")
      raise Lookbook::RoutingError, message
    end
  end
end
