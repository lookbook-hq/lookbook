module PhlexComponents
  class TitleAndContent < Phlex::HTML
    def initialize(title)
      @title = title
    end

    def view_template
      article(data: {component: "phlex-components/title-and-content"}) do
        h2 { @title }
        section do
          yield
        end
      end
    end
  end
end
