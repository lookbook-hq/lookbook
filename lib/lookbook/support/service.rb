module Lookbook
  class Service
    def self.call(*, **, &block)
      new(*, **).call(&block)
    end
  end
end
