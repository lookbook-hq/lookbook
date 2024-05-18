module Lookbook
  module PathHelper
    def page_path(identifier, **kwargs)
      page = Lookbook::Pages.resolve_page(identifier)
      raise ArgumentError, "Could not resolve page identifier" unless page

      lookbook.page_path(page, **kwargs)
    end

    def preview_page_path(preview_identifier, **kwargs)
      preview = Lookbook::Previews.resolve_preview(preview_identifier)
      raise ArgumentError, "Could not resolve preview identifier" unless preview

      lookbook.preview_page_path(preview, **kwargs)
    end

    def inspect_target_path(preview_identifier, target_identifier, **kwargs)
      preview = Lookbook::Previews.resolve_preview(preview_identifier)
      raise ArgumentError, "Could not resolve preview identifier" unless preview

      target = preview.resolve_target(target_identifier)
      raise ArgumentError, "Could not resolve inspector target identifier" unless target

      lookbook.inspect_target_path(preview, target, **kwargs)
    end

    def preview_target_path(preview_identifier, target_identifier, **kwargs)
      preview = Lookbook::Previews.resolve_preview(preview_identifier)
      raise ArgumentError, "Could not resolve preview identifier" unless preview

      target = preview.resolve_target(target_identifier)
      raise ArgumentError, "Could not resolve inspector target identifier" unless target

      lookbook.preview_target_path(preview, target, **kwargs)
    end

    def preview_embed_path(preview_identifier, target_identifier, **kwargs)
      preview = Lookbook::Previews.resolve_preview(preview_identifier)
      raise ArgumentError, "Could not resolve preview identifier" unless preview

      target = preview.resolve_target(target_identifier)
      raise ArgumentError, "Could not resolve inspector target identifier" unless target

      lookbook.preview_embed_path(preview, target, **kwargs)
    end
  end
end
