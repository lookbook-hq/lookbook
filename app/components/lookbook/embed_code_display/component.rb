module Lookbook
  class EmbedCodeDisplay::Component < Lookbook::BaseComponent
    attr_reader :preview, :pages, :params, :target

    def initialize(preview:, target:, pages:, params:, **html_attrs)
      @preview = preview
      @target = target
      @pages = pages
      @params = params.deep_symbolize_keys
      super(**html_attrs)
    end

    def app_path
      Lookbook::Engine.mount_path.to_s
    end

    def preview_name
      preview.preview_class_name
    end

    def external_embed_params
      permitted = params.select { |key, val| key.to_s != "_display" }
      permitted.transform_keys! { |key| "param-#{key}" }
    end

    def embed_options
      types = [
        ["For embedding on...", ""],
        ["Lookbook pages", "lookbook"],
        ["External sites", "external"]
      ]
      options_for_select(types, {
        disabled: types.first.first,
        selected: types.first.first
      })
    end

    private

    def alpine_component
      "embedCodeDisplayComponent"
    end
  end
end
