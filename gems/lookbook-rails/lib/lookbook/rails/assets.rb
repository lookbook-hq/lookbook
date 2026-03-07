require "json"

module Lookbook::Rails
  module Assets
    class << self
      include ActionView::Helpers::AssetTagHelper

      def asset_tags
        assets = asset_manifest
        stylesheets = assets[:stylesheets].map { stylesheet_link_tag("/#{_1}") }
        scripts = assets[:scripts].map { javascript_include_tag("/#{_1}", type: "module", defer: true) }

        [*stylesheets, *scripts]
      end

      def asset_manifest
        entries = JSON.load_file(Lookbook::Rails::Engine.root.join("dist/manifest.json"))&.with_indifferent_access

        if entries.present?
          entries.each_with_object({stylesheets: [], scripts: []}) do |(key, entry), manifest|
            if entry[:isEntry]
              manifest[:scripts] << entry[:file] if entry[:file]
              manifest[:stylesheets].push(*Array.wrap(entry[:css])) if entry[:css]
            end
          end
        end
      end
    end
  end
end
