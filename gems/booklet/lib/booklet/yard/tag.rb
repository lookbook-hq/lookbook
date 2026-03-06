# frozen_string_literal: true

require "yard/tags/tag"

module Booklet
  module YARD
    class Tag < ::YARD::Tags::Tag
      def options_string
        (@options_string || "").strip
      end

      def options? = false

      class << self
        def tag_name(tagname = nil)
          tagname.nil? ? yard_tag_name : self.yard_tag_name = tagname
        end

        def label = tag_name.to_s.titleize

        private def fallback_tag_name
          (name.demodulize.delete_suffix("Tag").underscore.downcase.presence || "tag").to_sym
        end
      end

      class_attribute :yard_tag_name,
        instance_accessor: false,
        instance_predicate: false,
        default: fallback_tag_name
    end
  end
end
