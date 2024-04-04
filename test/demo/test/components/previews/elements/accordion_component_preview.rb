module Elements
  # Examples of rendering a template partial preview.
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
