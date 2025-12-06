module Lookbook
  module Rescuable
    extend ActiveSupport::Concern

    included do
      rescue_from ActionController::RoutingError, with: :not_found

      protected

      def not_found(error = nil)
        @error = error
        render "lookbook/errors/not_found", status: :not_found
      end
    end
  end
end
