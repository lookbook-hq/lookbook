module Lookbook
  module WithInertia
    extend ActiveSupport::Concern
    include Lookbook::Rails

    included do
      layout "lookbook/application"

      after_action do
        cookies["XSRF-TOKEN"] = form_authenticity_token if protect_against_forgery?
      end

      rescue_from StandardError, with: :inertia_error_page
    end

    class_methods do
      def inertia_share(hash = nil, &block)
        push_to_inertia_share(**(hash || {}), &block)
      end

      def _inertia_configuration
        @_inertia_configuration ||= superclass.try(:_inertia_configuration) || Lookbook::InertiaRails.configuration
      end

      def _inertia_shared_data
        @_inertia_shared_data ||= begin
          shared_data = superclass.try(:_inertia_shared_data)

          if @inertia_share && shared_data.present?
            shared_data + @inertia_share.freeze
          else
            @inertia_share || shared_data || []
          end.freeze
        end
      end

      private

      def push_to_inertia_share(**attrs, &block)
        @inertia_share ||= []
        @inertia_share << attrs.freeze unless attrs.empty?
        @inertia_share << block if block
      end
    end

    private

    def inertia_configuration
      self.class._inertia_configuration.bind_controller(self)
    end

    def inertia_shared_data
      self.class._inertia_shared_data.filter_map do |shared_data|
        if shared_data.respond_to?(:call)
          instance_exec(&shared_data)
        else
          shared_data
        end
      end.reduce({}, &:merge)
    end

    private def inertia_error_page(error = nil)
      if Lookbook.env.development?
        error error
        pd(error) if error
      end

      case error
      when ActionController::RoutingError
        render inertia: "errors/not_found", props: {status:}, status: :not_found
      else
        status = ActionDispatch::ExceptionWrapper.new(nil, error).status_code if error
        render inertia: "errors/error", props: {status:}, status:
      end
    end
  end
end
