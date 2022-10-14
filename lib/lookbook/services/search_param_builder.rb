module Lookbook
  class SearchParamBuilder < Service
    attr_reader :data

    def initialize(data)
      @data = data
    end

    def call
      data.map { "#{_1}:#{_2}" }.join("|")
    end
  end
end
