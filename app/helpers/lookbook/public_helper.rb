module Lookbook
  module PublicHelper
    def lookbook_page(page, **kwargs, &block)
      render Lookbook::UI::Page.new(page: page, **kwargs), &block
    end

    def lookbook_code(source = nil, language: nil, **kwargs, &block)
      render Lookbook::UI::Code.new(source: source, language: language, **kwargs), &block
    end

    def lookbook_prose(**kwargs, &block)
      render Lookbook::UI::Prose.new(**kwargs), &block
    end
  end
end
