module Lookbook
  class DataObject
    class << self
      def new(data = nil, **properties)
        ActiveSupport::OrderedOptions.new.merge!({**data.to_h, **properties})
      end
    end
  end
end
