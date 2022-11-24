module Lookbook
  class Embed::Component < Lookbook::BaseComponent
    attr_reader :example, :params, :options

    def initialize(example:, params: {}, options: {}, **html_attrs)
      @example = example
      @params = params
      @options = options
      super(**html_attrs)
    end

    def embed_path
      Engine.routes.url_helpers.lookbook_embed_path(example.path, params)
    end

    def alpine_component
      "embedComponent"
    end
  end
end
