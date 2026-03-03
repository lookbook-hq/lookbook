module Lookbook
  class Folder < ResourceNode
    permit_child_nodes Folder, Page, Spec

    def icon
      root? ? "layout-list" : "folder"
    end

    def url_path
      root? ? collection.url_path : super
    end

    def to_json
      converter = Booklet::HashConverter.new(props: {
        id: true,
        ref: false,
        label: true,
        icon: true,
        href: ->(node) { node.url_path },
        leaf: ->(node) { node.leaf? },
        hidden: ->(node) { node.hidden? },
        branch: ->(node) { node.branch? }
      })

      accept(converter).to_json
    end
  end
end
