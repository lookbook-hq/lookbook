module Lookbook
  class PermalinkController < ApplicationController
    def show
      entity = Previews.find { _1.uuid == params[:uuid] } ||
        Previews.inspector_targets.find { _1.uuid == params[:uuid] } ||
        Pages.find { _1.uuid == params[:uuid] }

      if entity
        redirect_url = case entity.type
        when :preview
          preview_page_path(entity, request.query_parameters)
        when :target
          inspect_target_path(entity.preview, entity, request.query_parameters)
        when :page
          page_path(entity, request.query_parameters)
        end

        redirect_to redirect_url and return if redirect_url
      end

      raise ActionController::RoutingError, "Could not resolve permalink '#{params[:uuid]}'"
    end
  end
end
