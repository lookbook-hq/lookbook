module Lookbook
  class YardTag < YARD::Tags::Tag
    def value = @text

    class << self
      def name
        raise "No TAG_NAME constant defined" unless defined?(self::TAG_NAME)
        self::TAG_NAME
      end

      def label = name.titleize
    end
  end
end
