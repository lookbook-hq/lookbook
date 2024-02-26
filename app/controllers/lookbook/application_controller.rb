module Lookbook
  class ApplicationController < ActionController::Base
    before_action :assign_template_vars

    rescue_from ActionController::RoutingError, with: :not_found

    def index
    end

    protected

    def assign_template_vars
      @config = Lookbook.config
      @previews = Previews.all
      @inspector = Inspector
      @events_endpoint = events_path if Engine.watch_files?
    end

    def not_found(error)
      @error = error
      render :not_found
    end
  end
end
