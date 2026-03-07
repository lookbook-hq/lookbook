# frozen_string_literal: true

module Lookbook::Rails
  module Inertia
    module Controller
      extend ActiveSupport::Concern

      included do
        after_action do
          cookies["XSRF-TOKEN"] = form_authenticity_token if protect_against_forgery?
        end
      end

      module ClassMethods
        def inertia_share(hash = nil, &block)
          push_to_inertia_share(**(hash || {}), &block)
        end

        def _inertia_configuration
          @_inertia_configuration ||= superclass.try(:_inertia_configuration) || Lookbook::Rails::Inertia.configuration
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
    end
  end
end
