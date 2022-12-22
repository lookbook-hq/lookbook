module Lookbook
  class Header::Component < Lookbook::BaseComponent
    renders_one :branding

    def initialize(debug_menu: false, **html_attrs)
      @debug_menu = debug_menu
      super(**html_attrs)
    end

    def landing_path
      helpers.lookbook_landing_path if defined? helpers.lookbook_landing_path
    end

    def debug_data
      JSON.pretty_generate(Lookbook.debug_data)
    end
  end
end
