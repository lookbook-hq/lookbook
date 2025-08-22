module Lookbook
  module ComponentHelper
    COMPONENT_CLASS_MAP = {}

    COMPONENTS = %i[
      tab tab_group tab_panel
      toolbar toolbar_button
      nav_tree nav_tree_item
      icon statusbar_item
      split_layout viewport code_block
    ]

    COMPONENTS.each do |name|
      define_method(name.to_s.camelize(:upper)) do |*args, **kwargs, &block|
        render_component(name, *args, **kwargs, &block)
      end
    end

    def render_component(name, *args, **kwargs, &block)
      klass = COMPONENT_CLASS_MAP[name.to_sym] ||= "Lookbook::#{name.to_s.camelize}Component".constantize
      instance = klass.new(*args, **kwargs)
      render instance, &block
    end
  end
end
