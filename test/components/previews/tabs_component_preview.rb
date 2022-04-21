class TabsComponentPreview < ViewComponent::Preview
  def standard
    render Lookbook::Tabs::Component.new(id: "tabs-example-one") do |tabs|
      tabs.tab :one, "Tab one"
      tabs.tab :two, "Tab two"
      tabs.tab :three, "Tab three"
    end
  end

  def disabled_tabs
    render Lookbook::Tabs::Component.new(id: "tabs-example-one") do |tabs|
      tabs.tab :one, "Tab one"
      tabs.tab :two, "Tab two", disabled: true
      tabs.tab :three, "Tab three", disabled: true
    end
  end

  # # Note that focus must be on the preview iframe for the hotkeys to work in this example.
  # def hotkeys
  #   render Lookbook::Tabs::Component.new(id: "tabs-example-one") do |tabs|
  #     tabs.tab :one, "Tab one (hotkey: ctrl.1)", hotkey: "ctrl.1"
  #     tabs.tab :two, "Tab two (hotkey: ctrl.  2)", hotkey: "ctrl.2"
  #   end
  # end

  # # @label Tab selection via Ruby
  # def tab_selected
  #   render Lookbook::Tabs::Component.new(id: "tabs-example-two", selected: :two) do |tabs|
  #     tabs.tab :one, "Tab one"
  #     tabs.tab :two, "Tab two"
  #     tabs.tab :three, "Tab three"
  #   end
  # end

  # # @label Tab selection via JS
  # def tab_selected_js_expression
  #   render Lookbook::Tabs::Component.new(id: "tabs-example-two", selected: "true ? 'three' : false") do |tabs|
  #     tabs.tab :one, "Tab one"
  #     tabs.tab :two, "Tab two"
  #     tabs.tab :three, "Tab three"
  #   end
  # end

  # # This example specifies a (JavaScript) handler that runs whenever a tab is selected.
  # # In this case it just logs the selected tab reference to the console.
  # def select_handler
  #   render Lookbook::Tabs::Component.new(id: "tabs-example-three", on_select: "(selected) => console.log(`Tab '${selected}' was selected`)") do |tabs|
  #     tabs.tab :one, "Tab one"
  #     tabs.tab :two, "Tab two"
  #     tabs.tab :three, "Tab three"
  #   end
  # end
end
