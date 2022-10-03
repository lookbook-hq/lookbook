module Lookbook
  class Service
    def self.call(*args, **kwargs)
      new(*args, **kwargs).call
    end
  end
end
