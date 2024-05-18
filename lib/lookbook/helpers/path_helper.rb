module Lookbook
  module PathHelper
    def page_path(identifier, **kwargs)
      page = Lookbook::Pages.resolve_page(identifier)
      lookbook.page_path(page, **kwargs) if page
    end

    def preview_page_path(preview_identifier, **kwargs)
      preview = Lookbook::Previews.resolve_preview(preview_identifier)
      lookbook.preview_page_path(preview, **kwargs) if preview
    end

    def inspect_target_path(preview_identifier, target_identifier, **kwargs)
      preview = Lookbook::Previews.resolve_preview(preview_identifier)
      if preview
        target = preview.resolve_target(target_identifier)
        lookbook.inspect_target_path(preview, target, **kwargs) if target
      end
    end
  end
end
