module Components
  class SimpleButton < Components::Base
    def view_template(&)
      button(&)
    end
  end
end
