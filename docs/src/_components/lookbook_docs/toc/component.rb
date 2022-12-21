module LookbookDocs
  class Toc::Component < Base
    renders_many :links, ->(label:, id:, level: 2, **kwargs) do
      tag.a href: "##{id}",
        class: "flex items-start space-x-1 w-full hover:underline",
        style: "padding-left: #{(level - 2) * 12}px" do
        icon(((level == 2) ? :arrow_right : :corner_down_right), size: 3.5, class: "text-gray-400 relative top-[3px]") + tag.span(label)
      end
    end

    attr_reader :title

    def initialize(title: "On this page", **attrs)
      @title = title
      @attrs = attrs
    end
  end
end
