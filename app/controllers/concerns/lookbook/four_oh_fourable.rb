module Lookbook
  module FourOhFourable
    extend ActiveSupport::Concern

    included do
      rescue_from ActionController::RoutingError, with: :not_found

      def not_found
        render "lookbook/errors/not_found", status: :not_found
      end
    end
  end
end
