module Lookbook
  class EmbedsController < ApplicationController
    before_action :assign_preview
    before_action :assign_targets
    before_action :assign_preview_params
    before_action :assign_panels
    before_action :assign_actions

    def show
      redirect_to preview_embed_path(@preview, @target, {
        targets: @target_names,
        preview_params: @preview_params,
        panels: @panels,
        actions: @actions
      })
    end

    private

    def assign_preview
      @preview = Previews.all.find { _1.preview_class_name == params[:preview] }
      raise ActionController::RoutingError, "Could not find preview '#{params[:preview]}'" unless @preview
    end

    def assign_targets
      @target_names = @preview.inspector_targets.map(&:name)

      if params[:scenario]
        @target_names = ListResolver.call(params[:scenario], @target_names)
      end

      @target = @preview.inspector_targets.find { _1.name == @target_names.first }
      raise ActionController::RoutingError, "Could not find target '#{params[:scenario]}' for preview '#{params[:preview]}'" unless @target
    end

    def assign_preview_params
      @preview_params = params[:params].present? ? JSON.parse(params[:params]) : {}
    end

    def assign_panels
      @panels = ListResolver.call(params.fetch(:panels, ""), Inspector.panels.map(&:name).excluding(:preview))
    end

    def assign_actions
      @actions = ListResolver.call(params.fetch(:actions, ""), [:open, :inspect])
    end

    def not_found(error)
      @error = error
      render :not_found, status: :not_found, layout: "layouts/lookbook/skeleton"
    end
  end
end
