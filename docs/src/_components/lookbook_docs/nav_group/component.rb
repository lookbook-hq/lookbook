module LookbookDocs
  class NavGroup::Component < Base
    renders_many :items, "NavItem"

    attr_reader :label

    def initialize(label:, **attrs)
      @label = label
      @attrs = attrs
    end

    class NavItem < Base
      attr_reader :label, :href, :active

      def initialize(label: nil, href: nil, active: false, **attrs)
        @label = label
        @href = href
        @active = active
        @attrs = attrs
      end

      def call
        tag.a(
          href: href,
          class: active ? "text-indigo-600 opacity-100" : "opacity-60 hover:opacity-100"
        ) { label }
      end
    end
  end
end
