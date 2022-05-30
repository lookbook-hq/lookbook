module Lookbook
  class Embed::Component < Lookbook::Component
    def initialize(id:, example:, params: {}, opts: {}, max_height: nil, **html_attrs)
      @id = id
      @example = example
      @params = params
      @opts = opts
      @max_height = max_height
      super(**html_attrs)
    end

    protected

    def alpine_data
      [@id.to_json, "$store.pages.embeds"].join(",")
    end

    def alpine_component
      "embedComponent"
    end
  end
end
