module Lookbook
  class Header::Component < Lookbook::BaseComponent
    renders_one :branding

    def landing_path
      helpers.landing_path if defined? helpers.landing_path
    end
  end
end
