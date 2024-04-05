module Elements
  # A dropdown menu component built with `Phlex`.
  class DropdownMenuComponentPreview < Lookbook::Preview
    def default
      render DropdownMenu.new(label: "A dropdown") do |dropdown|
        dropdown.item("#") { "Item 1" }
        dropdown.item("#") { "Item 2" }
        dropdown.item("#") { "Item 3" }
      end
    end
  end
end
