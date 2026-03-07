# frozen_string_literal: true

require "active_support/ordered_options"
require "commonmarker"

module Lookbook::Core
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

    def content = content_node

    def content=(str)
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

    def display_options = Options.new(@display_options)

    def call(view_context, **locals)
      locals = {page: to_h}.deep_merge(locals)

      markdown = content.transform do |content|
        view_context.render(inline: content, locals:)
      end

      markdown.to_html
    end

    def to_h
      {name:, label:, data:}
    end

    alias_method :spec, :parent

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
        page.content = contents
        page
      end
    end
  end
end
