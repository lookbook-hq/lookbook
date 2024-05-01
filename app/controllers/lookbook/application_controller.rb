module Lookbook
  class ApplicationController < ActionController::Base
    helper AppHelper
    helper AssetHelper

    before_action :assign_template_vars

    rescue_from ActionController::RoutingError, with: :not_found

    def permalink
      type = params[:uuid].split("_")&.first
      if type.present?
        redirect_url = case type.to_sym
        when :page
          page = Pages.find { _1.uuid == params[:uuid] }
          page_path(page, request.query_parameters)
        when :preview
          preview = Previews.find { _1.uuid == params[:uuid] }
          preview_page_path(preview, request.query_parameters)
        when :inspect
          target = Previews.inspector_targets.find { _1.uuid == params[:uuid] }
          inspect_target_path(target.preview, target, request.query_parameters)
        else
          raise ActionController::RoutingError, "Could not resolve permalink '#{params[:uuid]}'"
        end

        redirect_to redirect_url
      else
        raise ActionController::RoutingError, "Could not resolve permalink '#{params[:uuid]}'"
      end
    end

    protected

    def assign_template_vars
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
