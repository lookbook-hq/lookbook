module Lookbook
  class ApplicationController < ActionController::Base
    before_action :assign_template_vars

    rescue_from ActionController::RoutingError, with: :not_found

    protected

    def assign_template_vars
      @config = Lookbook.config
      @previews = Previews.all
      @previews_tree = Previews.to_tree
      @events_endpoint = events_path if Engine.watch_files?
    end

    def not_found(error)
      @error = error
      render :not_found
    end
  end
end
