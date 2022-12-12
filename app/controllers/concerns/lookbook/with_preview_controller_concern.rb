module Lookbook
  module WithPreviewControllerConcern
    extend ActiveSupport::Concern

    def preview_controller
      return @_preview_controller if @_preview_controller

      controller = Engine.preview_controller.new
      controller.request = request
      controller.response = response
      @_preview_controller ||= controller
    end
  end
end
