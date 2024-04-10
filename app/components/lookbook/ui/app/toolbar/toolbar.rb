module Lookbook
  module UI
    class Toolbar < BaseComponent
      with_slot :title

      with_slot :action do |*args, **kwargs, &block|
        block ? block.call : lookbook_icon_button(*args, **kwargs)
      end
    end
  end
end
