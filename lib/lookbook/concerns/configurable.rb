module Lookbook
  module Configurable
    extend ActiveSupport::Concern

    def config
      Lookbook.config
    end
  end
end
