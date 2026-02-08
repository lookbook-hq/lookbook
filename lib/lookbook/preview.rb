# frozen_string_literal: true

module Lookbook
  class Preview
    def initialize(view_context = nil)
      @view_context = view_context
    end

    protected def render(...)
      if @view_context
        @view_context.render(...)
      else
        raise "Cannot render a preview without a view context"
      end
    end
  end
end
