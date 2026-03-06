module Booklet
  module Nameable
    extend ActiveSupport::Concern

    included do
      prop :name, String, reader: :public, writer: :public do |value|
        value.to_s
      end

      prop :label, _String?, writer: :public
      prop :title, _String?, writer: :public

      def label=(value)
        @label = value&.to_s
      end

      def label = @label ||= default_label

      def title=(value)
        @title = value&.to_s
      end

      def title = @title ||= default_title

      protected def default_name = name

      protected def default_label = default_name.titleize

      protected def default_title = default_label
    end
  end
end
