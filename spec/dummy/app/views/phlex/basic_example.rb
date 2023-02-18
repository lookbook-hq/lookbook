module Views::Phlex
  class BasicExample < Phlex::HTML
    def template
      p { "phlex component" }
    end
  end
end
