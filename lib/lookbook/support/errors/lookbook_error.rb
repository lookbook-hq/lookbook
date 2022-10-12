module Lookbook
  class LookbookError < StandardError
    attr_reader :scope, :original, :message

    def initialize(msg = nil, scope: nil, original: nil)
      @scope = scope
      @original = original
      @message = msg
      super(msg)
    end

    def full_message
      if msg.nil?
        message
      else
        scope_str = scope.nil? ? "[#{scope}]" : ""
        "#{scope_str} #{message}".strip
      end
    end
  end
end
