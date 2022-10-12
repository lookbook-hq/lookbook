module Lookbook
  module AttributeUtils
    class << self
      def dom_id(*args)
        ["lookbook", *args].join("-").parameterize.dasherize
      end
    end
  end
end
