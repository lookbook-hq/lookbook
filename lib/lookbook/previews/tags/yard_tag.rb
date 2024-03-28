module Lookbook
  class YardTag < YARD::Tags::Tag
    def value = @text

    def options_str
      @options || ""
    end

    class << self
      def name
        raise "No TAG_NAME constant defined" unless defined?(self::TAG_NAME)
        self::TAG_NAME
      end

      def label = name.titleize
    end
  end
end
