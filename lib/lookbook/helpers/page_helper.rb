module Lookbook
  module PageHelper
    def page_path(identifier, **kwargs)
      page = Lookbook::Pages.resolve_page(identifier)
      lookbook.page_path(page, **kwargs) if page
    end

    def preview_path(preview_identifier, target_identifier = nil, **kwargs)
      preview = Lookbook::Previews.resolve_preview(preview_identifier)
      if preview
        if target_identifier.nil?
          lookbook.preview_page_path(preview, **kwargs)
        else
          target = preview.resolve_target(target_identifier)
          lookbook.inspect_target_path(preview, target, **kwargs) if target
        end
      end
    end
  end
end
