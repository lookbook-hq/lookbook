module Lookbook
  class PhlexPreview < Preview
    def render(component, &block)
      super do
        component.instance_exec component, &block
      end
    end
  end
end
