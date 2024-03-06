module Lookbook
  module SharedHelper
    def lookbook_page(page, **kwargs, &block)
      render Lookbook::UI::Page.new(page: page, **kwargs), &block
    end

    def lookbook_code(source = nil, language: nil, **kwargs, &block)
      render Lookbook::UI::Code.new(source: source, language: language, **kwargs), &block
    end

    def lookbook_prose(**kwargs, &block)
      render Lookbook::UI::Prose.new(**kwargs), &block
    end

    def lookbook_page_path(page, **kwargs)
      lookbook.show_page_path(page, **kwargs)
    end

    def lookbook_preview_path(preview, target = nil, **kwargs)
      target.nil? ? lookbook.show_preview_path(preview, **kwargs) : lookbook.inspect_target_path(preview, target, **kwargs)
    end
  end
end
