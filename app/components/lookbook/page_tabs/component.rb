module Lookbook
  class PageTabs::Component < Lookbook::Component
    renders_many :tabs, ->(**attrs, &block) do
      @tabs ||= []
      attrs[:content] = capture(&block)
      @tabs << attrs
    end

    def before_render
      tabs.size
    end
  end
end
