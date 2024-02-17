module Lookbook
  module Component
    module AcceptsOptions
      extend ActiveSupport::Concern

      delegate :get_option_value,
        :set_option_value,
        :option_value_equals?,
        :get_option,
        :merge_option_values,
        to: :accepted_options

      def get_option_group(...)
        accepted_options.get_group(...)
      end

      def accepted_options
        @_accepted_options ||= self.class.option_group.clone
      end

      class_methods do
        delegate :accepts_option, to: :option_group

        def option_group
          @_options ||= Lookbook::Component::OptionsGroup.new(:root)
        end
      end
    end
  end
end
