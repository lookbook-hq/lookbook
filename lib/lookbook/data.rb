module Lookbook
  module Data
    def data
      @data ||= Store.new
    end

    def data=(props)
      @data = Store.new(props)
    end
  end
end
