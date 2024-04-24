module Lookbook
  class ApplicationController < ActionController::Base
    before_action :assign_template_vars

    rescue_from ActionController::RoutingError, with: :not_found

    def index
      landing = @pages.find(&:landing?)
      redirect_to landing.url_path if landing
    end

    protected

    def assign_template_vars
      @lookbook = Lookbook
      @config = Lookbook.config
      @inspector = Inspector
      @pages = Pages
      @previews = Previews
      @notifications = Engine.notifications
      @events_endpoint = events_path if Engine.watch_files?
    end

    def not_found(error)
      @error = error
      render :not_found, status: :not_found
    end
  end
end
