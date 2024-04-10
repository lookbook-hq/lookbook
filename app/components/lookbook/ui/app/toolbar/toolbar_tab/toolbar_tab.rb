module Lookbook
  module UI
    class ToolbarTab < BaseComponent
      attr_reader :name, :label

      def initialize(name:, **kwargs)
        @name = name
        @label = label || name.titleize
      end
    end
  end
end
