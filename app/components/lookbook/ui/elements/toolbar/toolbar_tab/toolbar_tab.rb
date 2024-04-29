module Lookbook
  module UI
    class ToolbarTab < BaseComponent
      attr_reader :name, :label

      def initialize(name:, disabled: false, **kwargs)
        @name = name.to_s
        @label = label || name.to_s.titleize
        @disabled = disabled
      end

      def disabled? = @disabled
    end
  end
end
