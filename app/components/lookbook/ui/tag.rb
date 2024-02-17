module Lookbook
  module UI
    class Tag < Lookbook::Component::Base
      include ActionView::Helpers::TagHelper

      SELF_CLOSING_TAGS = %i[area base br col embed hr img input link meta param source track wbr].freeze

      attr_reader :tag_name, :root, :strip

      def initialize(tag_name = :div, strip: false, root: false, **tag_attrs)
        @tag_name = tag_name
        @tag_attrs = tag_attrs
        @strip = strip
        @root = root
      end

      def content
        strip ? super.strip_heredoc.strip : super
      end

      def call
        if SELF_CLOSING_TAGS.include?(@tag_name)
          tag(tag_name, tag_attrs)
        else
          content_tag(tag_name, content, tag_attrs)
        end
      end

      def tag_attrs
        attrs = @tag_attrs.except(:x)

        alpine_attrs = @tag_attrs.fetch(:x, {})
        if alpine_attrs.any?
          attrs.merge!(x_attrs(alpine_attrs, root: root))
        end

        attrs
      end

      private

      def x_attrs(attrs, root: false)
        attrs.symbolize_keys!

        if root && !attrs.key?(:data)
          attrs[:data] = "" # Add empty x-data attribute if none has been specified
        end

        if attrs[:options] == true
          attrs[:options] = "options"
        end

        attrs.transform_values! { (_1 == true) ? "" : _1 } # convert boolean x-attributes

        # prefix attributes where needed
        attrs.transform_keys do |key|
          key = key.to_s
          key.first.in?(["@", ":"]) ? key : "x-#{key}"
        end
      end
    end
  end
end
