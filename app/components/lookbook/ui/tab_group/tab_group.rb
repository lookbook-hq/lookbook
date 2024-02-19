module Lookbook
  module UI
    class TabGroup < BaseComponent
      with_slot :tab do |name, label: nil, **kwargs, &block|
        panel_name = name.parameterize
        tab = tag.send(:sl_tab, slot: "nav", panel: panel_name) { label || name.titleize }
        panel = tag.send(:sl_tab_panel, name: panel_name, &block)
        safe_join([tab, panel])
      end

      attr_reader :id

      def initialize(id:, **kwargs)
        @id = id
      end
    end
  end
end
