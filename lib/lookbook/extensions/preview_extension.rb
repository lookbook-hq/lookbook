module Lookbook
  module PreviewExtension
    extend ActiveSupport::Concern

    included do
      def render(component, **args, &block)
        if component.is_a?(String)
          {
            type: :view,
            block: block,
            locals: args,
            template: component
          }
        else
          {
            type: :component,
            args: args,
            block: block,
            component: component,
            locals: {},
            template: "view_components/preview"
          }
        end
      end
    end
  end
end
