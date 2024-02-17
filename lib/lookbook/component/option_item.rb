module Lookbook
  module Component
    module OptionItem
      extend ActiveSupport::Concern

      def alias
        @alias || name
      end

      def html_alias
        self.alias.to_s.tr("_", "-")
      end

      def private?
        @private == true
      end

      def public?
        !private?
      end

      class_methods do
        def new(arg, **opts)
          arg.is_a?(self) ? arg : super(arg, **opts)
        end
      end
    end
  end
end
