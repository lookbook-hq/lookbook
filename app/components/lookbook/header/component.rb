module Lookbook
  class Header::Component < Lookbook::BaseComponent
    renders_one :branding

    def initialize(debug_menu: false, **html_attrs)
      @debug_menu = debug_menu
      super(**html_attrs)
    end

    def landing_path
      helpers.landing_path if defined? helpers.landing_path
    end
  end
end
