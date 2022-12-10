module LookbookDocs
  class NavGroup::Component < Base
    renders_many :items, "NavItem"

    attr_reader :label

    def initialize(label:, **attrs)
      @label = label
      @attrs = attrs
    end

    class NavItem < Base
      attr_reader :label, :href

      def initialize(label: nil, href: nil, **attrs)
        @label = label
        @href = href
        @attrs = attrs
      end

      def call
        tag.a(href: href, class: "opacity-60 hover:opacity-100") { label }
      end
    end
  end
end
