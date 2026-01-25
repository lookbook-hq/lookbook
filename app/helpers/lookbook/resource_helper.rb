module Lookbook
  module ResourceHelper
    RESOURCE_ICONS = {
      page: "file-text",
      spec: "layers-2",
      folder: "folder",
      scenario: "square-dashed-mouse-pointer"
    }.freeze

    def collection_nav_json(collection, resources)
      hash = resources.accept(
        Booklet::HashConverter.new(props: {
          id: true,
          ref: false,
          label: true,
          href: ->(node) { resource_nav_url(collection, node) },
          icon: ->(node) { resource_nav_icon(node) },
          leaf: ->(node) { node.leaf? },
          branch: ->(node) { node.branch? }
        })
      )
      JSON.generate(hash[:children])
    end

    def resource_nav_url(collection, node)
      case node.resource_type
      when :page
        lookbook_page_path(collection, node)
      when :spec
        lookbook_spec_path(collection, node)
      when :scenario
        lookbook_scenario_path(collection, node.parent, node)
      end
    end

    def resource_nav_icon(node)
      RESOURCE_ICONS.fetch(node.resource_type)
    end
  end
end
