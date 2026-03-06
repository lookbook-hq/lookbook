# frozen_string_literal: true

module Booklet
  module YARD
    class TagSet < Booklet::Object
      include Enumerable

      prop :tags, _Array(Tag), :positional, default: [].freeze

      def label_tag
        label_tags&.last
      end

      def hidden_tag
        hidden_tags&.last
      end

      def display_tags
        @tags.grep(YARD::DisplayOptionTag)
      end

      def param_tags
        @tags.grep(YARD::ParamTag)
      end

      def other_tags
        @tags.difference(label_tags + hidden_tags + display_tags + param_tags)
      end

      delegate :each, to: :tags

      private def label_tags
        @tags.grep(YARD::LabelTag)
      end

      private def hidden_tags
        @tags.grep(YARD::HiddenTag)
      end
    end
  end
end
