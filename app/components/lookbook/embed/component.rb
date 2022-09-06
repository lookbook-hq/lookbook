module Lookbook
  class Embed::Component < Lookbook::BaseComponent
    def initialize(id:, example:, params: {}, opts: {}, max_height: nil, **html_attrs)
      @id = id
      @target = example
      @params = params
      @opts = opts
      @max_height = max_height
      super(**html_attrs)
    end

    protected

    def lookbook_inspect_path(*args)
      Lookbook::Engine.routes.url_helpers.lookbook_inspect_path(*args)
    end

    def lookbook_preview_path(*args)
      Lookbook::Engine.routes.url_helpers.lookbook_preview_path(*args)
    end

    def alpine_data
      [alpine_encode(@id), "$store.pages.embeds"].join(",")
    end

    def alpine_component
      "embedComponent"
    end
  end
end
