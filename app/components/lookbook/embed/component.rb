module Lookbook
  class Embed::Component < Lookbook::BaseComponent
    ACTIONS = [:inspect, :open]

    attr_reader :scenario, :params, :options

    def initialize(scenario:, params: {}, options: {}, **html_attrs)
      @scenario = scenario
      @params = params.to_h
      @options = options.to_h
      super(**html_attrs)
    end

    def id
      Utils.id("embed", embed_path.hash)
    end

    def embed_path
      Engine.routes.url_helpers.lookbook_embed_path(scenario.lookup_path, {
        _options: SearchParamEncoder.call(options),
        **params
      })
    end

    def alpine_component
      "embedComponent"
    end
  end
end
