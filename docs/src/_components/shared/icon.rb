module Shared
  class Icon < Shared::Base
    def initialize(name:)
      @name = name
    end

    def call
      tag.i data: {feather: @name}, class: "h-4 w-4 inline-block stroke-current stroke-2"
    end
  end
end