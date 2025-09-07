module PhlexComponents
  class HelpersExample < Phlex::HTML
    def view_template
      a(href: url_for(:root)) { "click here" }
    end
  end
end
