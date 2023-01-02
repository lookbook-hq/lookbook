module Lookbook
  # @api private
  module AnnotatableEntity
    extend ActiveSupport::Concern

    included do
      delegate :has_tag?, to: :code_object

      def notes
        code_object.docstring.to_s.strip
      end

      def tags(name = nil)
        code_object.tags(name)
      end

      def tag(name = nil)
        tags(name).first
      end

      protected

      attr_reader :code_object

      def fetch_config(key, fallback = nil, &block)
        value = case key.to_sym
        when :targets
          targets_config
        when :display_options
          display_options_config
        else
          tag(key).value if has_tag?(key)
        end

        Utils.value_or_fallback(value, fallback, &block)
      end

      private

      def targets_config
        return unless has_tag?(:component) || has_tag?(:target)

        [*tags(:component), *tags(:target)].map(&:value).compact
      end

      def display_options_config
        return unless has_tag?(:display)

        # Dynamic params set at the entity level are
        # not (yet?) supported so filter them out.
        display_tags = tags(:display).select do |tag|
          !tag.value.is_a?(Hash) && !tag.value.is_a?(Array)
        end

        display_tags.map { |tag| [tag.key.to_sym, tag.value] }.to_h
      end
    end
  end
end
