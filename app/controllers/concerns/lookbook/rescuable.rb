module Lookbook
  module Rescuable
    extend ActiveSupport::Concern

    included do
      rescue_from ActionController::RoutingError do |err|
        raise Lookbook::RoutingError, err.message, original: err
      end

      rescue_from StandardError, with: :handle_error

      protected

      def handle_error(err)
        raise err if Lookbook.config.preview_disable_error_handling

        @error = err.is_a?(Lookbook::Error) ? err : Lookbook::Error.new(original: err)
        @status_code = get_status_code(err)

        view = (@status_code == :not_found) ? "not_found" : "default"
        layout = self.class.send(:_layout) || "lookbook/application"

        render "lookbook/errors/#{view}", layout: layout, status: @status_code
      end

      def get_status_code(err)
        if err.respond_to?(:status)
          err.status
        else
          status_map = ActionDispatch::ExceptionWrapper.rescue_responses
          status_map.fetch(err.class.name, :internal_server_error)
        end
      end
    end
  end
end
