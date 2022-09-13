module Lookbook
  module Data
    def data
      @data ||= Store.new({}, true)
    end

    def data=(props)
      @data = Store.new(props, true)
    end
  end
end
