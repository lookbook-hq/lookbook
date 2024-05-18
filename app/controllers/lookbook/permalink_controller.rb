module Lookbook
  class PermalinkController < ApplicationController
    def show
      type = params[:uuid].split("_")&.first
      if type.present?
        redirect_url = case type.to_sym
        when :page
          page = Pages.find { _1.uuid == params[:uuid] }
          page_path(page, request.query_parameters)
        when :preview
          preview = Previews.find { _1.uuid == params[:uuid] }
          preview_page_path(preview, request.query_parameters)
        when :target
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
  end
end
