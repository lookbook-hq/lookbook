require "logger"

module Lookbook
  @logger = nil

  class Logger < ::Logger
    COLORS = {
      accent: "\e[0;36m",  # Cyan
      value: "\e[0;35m",   # Magenta
      DEBUG: "\e[0;33m",   # Brown text
      INFO: "\e[0;34m",    # Blue text
      WARN: "\e[1;33m",    # Yellow text
      ERROR: "\e[1;31m",   # Red text
      FATAL: "\e[1;31m",   # Red text
      unknown: "\e[0m"     # Terminal default
    }.with_indifferent_access.freeze

    RESET_COLOR = "\e[0m"

    def initialize(*)
      super
      self.formatter = proc do |severity, datetime, progname, msg|
        level_color = COLORS[severity] || COLORS[unknown]
        msg = "#{level_color}#{msg[0]}:#{RESET_COLOR} #{COLORS[:value]}#{msg[1]}#{RESET_COLOR}" if msg.is_a?(Array)
        "lookbook #{level_color}[#{severity}] #{msg}#{RESET_COLOR}\n"
      end
    end

    class << self
      def level_as_string(level)
        Lookbook.logger.class::SEV_LABEL[level]
      end
    end
  end

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
          Lookbook.env.development? ? ::Logger::DEBUG : ::Logger::ERROR
        end

      Logger.new($stderr, level: level)
    end
  end
end
