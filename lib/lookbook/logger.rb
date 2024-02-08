module Lookbook
  @logger = nil

  class << self
    attr_writer :logger

    # Returns the logger instance used by Lookbook
    #
    # @return [Logger] The logger instance
    def logger
      @logger ||= default_logger
    end

    private

    def default_logger
      level =
        case ENV["LOOKBOOK_LOG_LEVEL"].to_s
        when /debug/i
          ::Logger::DEBUG
        when /info/i
          ::Logger::INFO
        when /warn/i
          ::Logger::WARN
        when /fatal/i
          ::Logger::FATAL
        else
          ::Logger::ERROR
        end

      ::Logger.new($stderr, level: level)
    end
  end
end
