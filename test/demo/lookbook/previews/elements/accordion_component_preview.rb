module Elements
  # An accordion component implemented using a Rails template partial.
  # @status wip
  class AccordionComponentPreview < Lookbook::Preview
    def default
      render "components/accordion", items: [
        {
          title: "Item 1",
          content: tag.p { "Item 1 content" },
          open: true
        },
        {
          title: "Item 2",
          content: tag.p { "Item 2 content" }
        }
      ]
    end
  end
end
