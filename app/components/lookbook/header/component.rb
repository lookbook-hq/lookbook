module Lookbook
  class Header::Component < Lookbook::Component
    renders_one :branding

    def landing_path
      helpers.landing_path if defined? helpers.landing_path
    end
  end
end
