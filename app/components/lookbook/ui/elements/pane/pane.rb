module Lookbook
  module UI
    class Pane < BaseComponent
      with_slot :toolbar, Lookbook::UI::Toolbar

      with_slot :tab_panel do |name, **kwargs|
        Lookbook::UI::TabPanel.new(name: name, **kwargs)
      end

      attr_reader :id

      def initialize(id:, **kwargs)
        @id = id
      end
    end
  end
end
