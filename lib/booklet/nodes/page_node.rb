# frozen_string_literal: true

require "active_support/ordered_options"
require "commonmarker"

module Booklet
  class PageNode < Node
    include Locatable
    include Nameable
    include Hideable

    EXTENSIONS = [".md", ".md.erb"]

    prop :data, _Nilable(Options), reader: :public do
      Options.new(_1)
    end

    prop :footer, _Boolean?, writer: :public, default: false
    prop :header, _Boolean?, writer: :public, default: false
    prop :landing, _Boolean?, writer: :public, default: false

    permit_child_nodes TextNode

    def data=(value)
      @data = Options.new(value)
    end

    def hidden? = @hidden

    def footer? = @footer

    def header? = @header

    def landing? = @landing

    def contents = content_node&.to_s || ""

    def contents=(str)
      if content_node.present?
        content_node.raw = str.to_s
      else
        add_child(TextNode.new(str.to_s))
      end
    end

    def insert_child(child, ...)
      if child.is_a?(TextNode) && content_node
        raise "Pages can only have a single text node"
      else
        super
      end
    end

    delegate :to_html, to: :content_node

    def display_options = Options.new(@display_options)

    alias_method :spec, :parent

    def render_in(view_context)
      view_context.render(inline: to_html, page: {data:})
    end

    protected def content_node
      children.grep(TextNode).first
    end

    class << self
      def from(path, **props)
        unless FileHelpers.extension(path).in?(EXTENSIONS)
          raise ArgumentError, "#{path} is not a PageNode"
        end

        path = Pathname(path)
        name = FileHelpers.file_name(path)
        contents = File.read(path)

        page = new(path:, name:, **props)
        page.contents = contents
        page
      end
    end
  end
end
