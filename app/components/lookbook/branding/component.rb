module Lookbook
  class Branding::Component < Lookbook::Component
    def initialize(text:, **html_attrs)
      @text = text
      super(**html_attrs)
    end
  end
end
