module Views::Phlex
  class ListExample < Phlex::HTML
    def template
      ul { yield }
    end

    def item(...)
      render Item.new(...)
    end
  end

  class Item < Phlex::HTML
    def template
      li { yield }
    end
  end
end
