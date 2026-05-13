module Components
  class SimpleIcon < Components::Base
    def view_template
      svg(
        viewbox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      ) do |s|
        s.path(d: "M12 2L2 22h20L12 2z", fill: "currentColor")
      end
    end
  end
end
