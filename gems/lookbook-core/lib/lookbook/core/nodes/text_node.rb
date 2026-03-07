module Lookbook::Core
  class TextNode < Node
    prop :raw, String, :positional, reader: :public, writer: :public

    def ref = "text_node_#{object_id}"

    def transform(&block)
      dup.tap do |node|
        node.raw = block.call(raw)
      end
    end

    def transform!
      self.raw = yield raw
      self
    end

    def to_ast
      Lookbook::Core.markdown.parse(raw)
    end

    def to_html
      Lookbook::Core.markdown.format(to_ast)
    end

    public alias_method :to_s, :raw
    public alias_method :to_str, :raw
  end
end
