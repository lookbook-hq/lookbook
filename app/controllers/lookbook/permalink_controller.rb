module Lookbook
  class PermalinkController < ApplicationController
    def show
      type = params[:uuid].split("_")&.first
      if type.present?
        redirect_url = case type.to_sym
        when :page
          page = Pages.find { _1.uuid == params[:uuid] }
          page_path(page, request.query_parameters) if page
        when :preview
          preview = Previews.find { _1.uuid == params[:uuid] }
          preview_page_path(preview, request.query_parameters) if preview
        when :target
          target = Previews.inspector_targets.find { _1.uuid == params[:uuid] }
          inspect_target_path(target.preview, target, request.query_parameters) if target
        end

        redirect_to redirect_url and return if redirect_url
      end

      raise ActionController::RoutingError, "Could not resolve permalink '#{params[:uuid]}'"
    end
  end
end
