module Lookbook
  module UI
    class SystemPage < BaseComponent
      with_slot :message do |**kwargs|
        Lookbook::UI::SystemMessage.new(theme: theme, **kwargs)
      end

      attr_reader :theme

      def initialize(theme: :default, **kwargs)
        @theme = theme
      end
    end
  end
end
