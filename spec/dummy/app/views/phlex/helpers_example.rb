module Views::Phlex
  class HelpersExample < Phlex::HTML
    def template
      a(href: helpers.url_for(:root)) { "click here" }
    end
  end
end
