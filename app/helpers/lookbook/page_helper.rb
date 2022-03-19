module Lookbook
  module PageHelper
    include Utils

    def code(language = "ruby", line_numbers: false, &block)
      render_component "code", language: language, line_numbers: line_numbers, &block
    end

    def embed(*args, params: {}, type: :preview, **opts)
      @embed_counter ||= 0
      lookup_path = to_preview_path(*args)
      if (args.size == 1 && args.first.is_a?(String)) || args.many?
        example = Lookbook.previews.find_example_by_path(lookup_path)
      else
        preview = Lookbook.previews.find_by_path(lookup_path)
        example = preview&.default_example
      end
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
