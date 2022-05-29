class NavComponentPreview < ViewComponent::Preview
  
  def basic
    render Lookbook::Nav::Component.new(
      collection: collection_from([
        "item_1",
        "item_2",
        "item_3",
      ]),
      alpine_data: "$store.workbench.nav",
    )
  end

  def nested
    render Lookbook::Nav::Component.new(
      collection: collection_from([
        "item_1",
        ["item_2", [
          "child_1",
          "child_2",
          ["child_3", [
            "grandchild_1",
            "grandchild_2",
          ]]
        ]],
        "item_3",
      ]),
      alpine_data: "$store.workbench.nav",
      "@click.stop.prevent": "console.log('Navigation is disabled in preview')"
    )
  end

  protected

  def item_from(path)
    if path.is_a?(Array)
      collection_from(*path)
    else
      Lookbook::Entity.new(path)
    end
  end

  def collection_from(path, items = [])
    if path.is_a?(Array)
      items = path
      path = ""
    end

    Lookbook::Collection.new path, items.map { |item| item_from(item) }
  end
end
