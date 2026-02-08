module Lookbook
  class NotFoundError < StandardError; end

  class ApplicationController < ActionController::Base
    include Unannotatable

    content_security_policy(false) if respond_to?(:content_security_policy)
    protect_from_forgery with: :exception

    rescue_from NotFoundError, ActionController::RoutingError, with: :not_found

    helper_method :fetch_request?, :lookbook_preview_path

    before_action :assign_collections

    def index
      render "lookbook/start"
    end

    def not_found
      render "lookbook/errors/not_found", status: :not_found, layout: "lookbook/application"
    end

    private def assign_collections
      @collections = Collection.all
    end

    protected def lookbook_preview_path(...)
      Rails.application.routes.url_helpers.lookbook_preview_path(...)
    end

    protected def fetch_request?
      request.headers["HTTP_X_LOOKBOOK_REQUEST"]
    end
  end
end
