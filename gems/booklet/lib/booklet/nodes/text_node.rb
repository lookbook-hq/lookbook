module Booklet
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
      Booklet.markdown.parse(raw)
    end

    def to_html
      Booklet.markdown.format(to_ast)
    end

    public alias_method :to_s, :raw
    public alias_method :to_str, :raw
  end
end
