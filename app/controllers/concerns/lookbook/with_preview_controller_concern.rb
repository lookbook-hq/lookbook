module Lookbook
  module WithPreviewControllerConcern
    extend ActiveSupport::Concern

    def preview_controller
      return @preview_controller if @preview_controller
      controller = Lookbook::Engine.preview_controller.new
      controller.request = request
      controller.response = response
      @preview_controller ||= controller
    end
  end
end
