module Views::Phlex
  class HelpersExample < Phlex::HTML
    def template
      p { helpers.url_for(:root) }
    end
  end
end
