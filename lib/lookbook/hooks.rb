module Lookbook
  module Hooks
    def after_initialize(&block)
      add_hook(:after_initialize, block)
    end

    def before_exit(&block)
      add_hook(:before_exit, block)
    end

    def after_change(&block)
      add_hook(:after_change, block)
    end

    protected

    def add_hook(event_name, block)
      Lookbook.config.hooks[event_name] << block
    end
  end
end
