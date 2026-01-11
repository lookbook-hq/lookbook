module Lookbook
  module NavHelper
    def nav_data_json(entities)
      hash = entities.accept(
        Booklet::HashConverter.new(props: {
          id: true,
          ref: false,
          label: true,
          icon: ->(node) { nav_icon(node.type.name) },
          leaf: ->(node) { node.leaf? },
          branch: ->(node) { node.branch? }
        })
      )
      JSON.generate(hash[:children])
    end

    def nav_icon(entity_type)
      case entity_type
      when "spec"
        "layers-2"
      when "folder"
        "folder"
      when "scenario"
        "square-dashed-mouse-pointer"
      else
        "smile"
      end
    end
  end
end
