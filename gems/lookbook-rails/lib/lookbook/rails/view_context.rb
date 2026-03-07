module Lookbook::Rails
  module ViewContext
    class << self
      def for(controller)
        controller_class = case controller
        when Symbol
          return self.for(Lookbook.config[controller]&.controller) # look up in config
        when String
          controller.constantize
        else
          ApplicationController
        end

        instance = controller_class.new
        instance.view_context_class.new(instance.lookup_context, instance.view_assigns, instance)
      end
    end
  end
end
