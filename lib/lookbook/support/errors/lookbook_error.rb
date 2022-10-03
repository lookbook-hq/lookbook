module Lookbook
  class LookbookError < StandardError
    def initialize(msg = nil, scope = nil)
      unless msg.nil?
        scope_str = scope.nil? ? "[#{scope}]" : ""
        msg = "#{scope_str} #{msg}".strip
      end
      super(msg)
    end
  end
end
