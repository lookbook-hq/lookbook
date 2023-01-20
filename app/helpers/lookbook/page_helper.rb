module Lookbook
  module PageHelper
    def page_path(id)
      page = id.is_a?(Page) ? id : Lookbook.pages.find_by_id(id)
      if page.present?
        lookbook_page_path page.lookup_path
      else
        Lookbook.logger.warn "Could not find page with id ':#{id}'"
      end
    end

    def embed(*args, params: {}, type: :preview, max_height: nil, **opts)
      return unless args.any?

      @embed_counter ||= 0

      preview = if args.first.is_a?(Symbol)
        Lookbook.previews.find_by_path(args.first)
      else
        Lookbook.previews.find_by_preview_class(args.first)
      end

      example = args[1] ? preview&.example(args[1]) : preview&.default_example
      embed_id = "#{url_for}/embed/#{example.lookup_path}".delete_prefix("/").tr("/", "-")

      lookbook_render :embed,
        id: embed_id,
        example: example,
        params: params,
        max_height: max_height,
        opts: opts
    end
  end
end
