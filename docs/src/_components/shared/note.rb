module Shared
  class Note < Shared::Base
    def initialize(type: :info)
      @type = type
    end
  end
end