module Lookbook
  module ResourcesHelper
    def resources_nav_json(resources)
      nav_data = resources.accept(
        Booklet::HashConverter.new(props: {
          id: true,
          ref: false,
          label: true,
          icon: true,
          href: ->(node) { node.url_path },
          leaf: ->(node) { node.leaf? },
          hidden: ->(node) { node.hidden? },
          branch: ->(node) { node.branch? }
        })
      )
      JSON.generate(nav_data[:children])
    end
  end
end
