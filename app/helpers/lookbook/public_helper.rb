module Lookbook
  module PublicHelper
    def lookbook_page(**kwargs, &block)
      render Lookbook::UI::Page.new(**kwargs), &block
    end

    def lookbook_code(language = nil, **kwargs, &block)
      render Lookbook::UI::Code.new(language: language, **kwargs), &block
    end

    def lookbook_prose(**kwargs, &block)
      render Lookbook::UI::Prose.new(**kwargs), &block
    end
  end
end
