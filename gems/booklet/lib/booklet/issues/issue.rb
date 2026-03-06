# frozen_string_literal: true

module Booklet
  class Issue < StandardError
    attr_reader :node

    def initialize(e, node: nil)
      message = e.respond_to?(:message) ? e.message : e.to_s
      super(message)
      @node = node

      if e.is_a?(Exception)
        @cause = e
        set_backtrace e.backtrace
      end
    end

    def severity
      @severity ||= self.class.name.demodulize.underscore.to_sym
    end
  end
end
