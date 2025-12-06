module Lookbook
  class ApplicationController < ActionController::Base
    include Configurable
    include Rescuable

    content_security_policy(false) if respond_to?(:content_security_policy)
    protect_from_forgery with: :exception

    rescue_from ActionController::RoutingError, with: :not_found

    helper_method :fetch_request?

    def index
      # if Lookbook.previews.any?
      #   redirect_to lookbook_specs_path
      # elsif Lookbook.pages.any?
      #   redirect_to lookbook_pages_path
      # else
      render "lookbook/start"
      # end
    end

    protected

    def fetch_request?
      request.headers["HTTP_X_LOOKBOOK_REQUEST"]
    end
  end
end
