module Lookbook
  module UI
    class SystemMessage < BaseComponent
      with_slot :title

      attr_reader :theme, :icon

      def initialize(theme: :default, icon: nil, **kwargs)
        @theme = theme
        @icon = icon
      end
    end
  end
end
