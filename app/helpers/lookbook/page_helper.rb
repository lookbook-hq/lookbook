module Lookbook
  module PageHelper
    include Utils

    def page_path(id)
      page = Lookbook.pages.find(id)
      lookbook.page_path page.lookup_path
    end

    def code(language = "ruby", line_numbers: false, &block)
      render_component "code", language: language, line_numbers: line_numbers, &block
    end

    def embed(*args, params: {}, type: :preview, **opts)
      return unless args.any?

      @embed_counter ||= 0

      preview_lookup = args.first.is_a?(Symbol) ? args.first : preview_class_name(args.first)
      preview = Lookbook.previews.find(preview_lookup)

      example = args[1] ? preview&.example(args[1]) : preview&.default_example

      if example
        @embed_counter += 1
        render_component "embed", {
          id: generate_id("embed", url_for, example.lookup_path, @embed_counter - 1),
          example: example,
          params: params,
          opts: opts
        }
      else
        embed_not_found
      end
    end

    protected

    def embed_not_found
      render_component "not_found", {
        title: "Preview not found",
        text: "The preview may have been renamed or deleted."
      }
    end
  end
end
