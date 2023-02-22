module LookbookDocs
  class Toc::Component < Base
    renders_many :links, "Link"

    attr_reader :title

    def initialize(title: "On this page", **attrs)
      @title = title
      @attrs = attrs
    end

    class Link < Base
      def initialize(label:, id:, level: 2, divider: false, **kwargs)
        @label = label
        @id = id
        @level = level
        @divider = divider
      end

      def icon
        helpers.icon(((@level == 2) ? :arrow_right : :corner_down_right), size: 3.5, class: "text-gray-400 relative top-[3px]")
      end

      def label
        tag.span(class: "truncate") { @label }
      end

      def href
        "##{@id}"
      end

      def indent
        (@level - 2) * 12
      end

      def call
        if @divider
          tag.a href: href,
            class: "toc-divider",
            style: "padding-left: #{indent}px" do
            label
          end
        else
          tag.a href: href,
            class: "toc-link",
            style: "padding-left: #{indent}px" do
            safe_join([icon, label])
          end
        end
      end
    end
  end
end
