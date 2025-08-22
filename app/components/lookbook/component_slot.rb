module Lookbook
  class ComponentSlot
    delegate_missing_to :result

    attr_reader :slot_name

    def initialize(name, handler, **context)
      @slot_name = name.to_sym

      @_handler = handler
      @_context = context
    end

    def result
      @_handler.call(*@_context[:args], **@_context[:kwargs], &@_context[:block])
    end

    def to_s
      rendered_result = if result.respond_to?(:render_in)
        view_context.render result, &@_context[:block]
      elsif @_context[:block]
        view_context.capture { @_context[:block].call }
      else
        result
      end

      rendered_result&.to_s&.html_safe
    end

    protected

    def view_context
      @_context.fetch(:view_context)
    end
  end
end
