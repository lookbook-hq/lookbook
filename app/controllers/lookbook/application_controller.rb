module Lookbook
  class ApplicationController < ActionController::Base
    include Configurable
    include FourOhFourable

    content_security_policy(false) if respond_to?(:content_security_policy)
    protect_from_forgery with: :exception

    before_action :assign_collections

    helper_method :fetch_request?

    def index
      render "lookbook/start"
    end

    protected def assign_collections
      @collections = Collection.all
    end

    protected def fetch_request?
      request.headers["HTTP_X_LOOKBOOK_REQUEST"]
    end
  end
end
