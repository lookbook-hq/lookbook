class DropdownMenu < Phlex::HTML
  def initialize(label:)
    @label = label
  end

  def view_template(&content)
    details(class: "dropdown") {
      summary { @label }
      ul(&content)
    }
  end

  def item(url, &content)
    li { a(href: url, &content) }
  end
end
