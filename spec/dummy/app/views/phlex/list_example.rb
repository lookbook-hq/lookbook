module Views
  class ListExample < Phlex::HTML
    def initialize(foo = nil)
    end
    def view_template(&block)
      ul(&block)
    end

    def item(...)
      render Item.new(...)
    end
  end

  class Item < Phlex::HTML
    def view_template(&block)
      li(&block)
    end
  end
end
