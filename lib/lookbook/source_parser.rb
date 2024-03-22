module Lookbook
  class SourceParser
    def initialize(log_level: YARD::Logger::ERROR, tags: [])
      @log_level = log_level

      tags.to_a.each do |tag_class|
        tag_class = tag_class.constantize if tag_class.is_a?(String)

        YARD::Tags::Library.define_tag(tag_class.label, tag_class.name, tag_class)
      end
    end

    def parse(paths)
      YARD::Logger.instance.enter_level(@log_level) do
        YARD::Registry.clear
        YARD.parse(paths)
      end

      yield YARD::Registry.all(:class)
    end
  end
end
