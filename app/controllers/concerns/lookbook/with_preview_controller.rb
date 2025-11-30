module Lookbook
  module WithPreviewController
    extend ActiveSupport::Concern

    included do
      helper_method :preview_controller

      protected

      def preview_controller
        @_preview_controller ||= begin
          controller = Engine.preview_controller.new
          controller.request = request
          controller.response = response
          controller
        end
      end
    end
  end
end
