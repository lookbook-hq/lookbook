module Lookbook
  class ApplicationController < ActionController::Base
    helper AppHelper
    helper AssetHelper

    before_action :assign_template_vars

    rescue_from ActionController::RoutingError, with: :not_found

    def not_found(error = nil)
      @error = error
      render :not_found, status: :not_found
    end

    protected

    def assign_template_vars
      @config = Lookbook.config
      @project = Project
      @inspector = Inspector
      @pages = Pages
      @previews = Previews
      @notifications = Engine.notifications
      @events_endpoint = events_path if Engine.watch_files?
    end
  end
end
