module Views::Phlex
  class HelpersExample < Phlex::HTML
    def view_template
      view_helpers = respond_to?(:view_context) ? view_context : helpers
      a(href: view_helpers.url_for(:root)) { "click here" }
    end
  end
end
