module Lookbook
  class ApplicationController < ActionController::Base
    include Concerns::Annotatable
    include Concerns::Inspectable

    content_security_policy(false) if respond_to?(:content_security_policy)
    protect_from_forgery with: :exception

    layout "lookbook/workspace"

    before_action :disable_view_annotations
    before_action :assign_instance_vars

    after_action :restore_view_annotations

    protected

    def assign_instance_vars
      @previews = Engine.previews
      @config = Lookbook.config
      @engine = Lookbook.engine
    end

    def ajax_request?
      request.env["HTTP_X_ALPINE_REQUEST"].present?
    end

    helper_method :ajax_request?
  end
end
