module Lookbook
  module PageHelper
    include Utils

    def page_path(id)
      page = id.is_a?(Page) ? id : Lookbook.pages.find_by_id(id)
      if page.present?
        lookbook_page_path page.lookup_path
      else
        Lookbook.logger.warn "Could not find page with id ':#{id}'"
      end
    end

    def embed(*args, params: {}, **options)
      return unless args.any?

      preview = if args.first.is_a?(Symbol)
        Lookbook.previews.find_by_path(args.first)
      else
        Lookbook.previews.find_by_preview_class(args.first)
      end
      example = args[1] ? preview&.example(args[1]) : preview&.default_example

      render Lookbook::Embed::Component.new example: example, params: params, options: options
    end
  end
end
