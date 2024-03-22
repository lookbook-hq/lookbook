module Lookbook
  class SourceParser
    def initialize(log_level: YARD::Logger::ERROR)
      @log_level = log_level
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
