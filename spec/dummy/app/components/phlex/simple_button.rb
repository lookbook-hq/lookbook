module Components
  class SimpleButton < Components::Base
    def view_template(&block)
      button(&block)
    end
  end
end
