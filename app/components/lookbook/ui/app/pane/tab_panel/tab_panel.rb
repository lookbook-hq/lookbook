module Lookbook
  module UI
    class TabPanel < BaseComponent
      attr_reader :name

      def initialize(name:, **kwargs)
        @name = name
      end
    end
  end
end
