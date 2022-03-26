module Lookbook
  class Error < StandardError
    delegate :full_message, :backtrace, :to_s, to: :target

    def initialize(original = nil, title: nil, message: nil, file_name: false, line_number: false)
      @original = original
      @title = title
      @message = message
      @file_name = file_name
      @line_number = line_number
      super()
    end

    def title
      @title || target.class.to_s
    end

    def message
      (@message || target.message).gsub("(<unknown>):", "").strip.upcase_first
    end

    def file_name
      path = if @file_name == false
        parsed_backtrace[0][0] if parsed_backtrace.any?
      else
        @file_name
      end
      path.delete_prefix("#{Rails.root}/")
    end

    def line_number
      if @line_number == false
        parsed_backtrace[0][1] if parsed_backtrace.any?
      else
        @line_number
      end
    end

    def parsed_backtrace
      backtrace.map do |x|
        x =~ /^(.+?):(\d+)(|:in `(.+)')$/
        [$1, $2, $4]
      end
    end

    protected

    def target
      @original.presence || self
    end
  end
end
