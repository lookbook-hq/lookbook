module Lookbook
  module UI
    class ToolbarTab < BaseComponent
      attr_reader :name, :label

      def initialize(name:, **kwargs)
        @name = name.to_s
        @label = label || name.to_s.titleize
      end
    end
  end
end
