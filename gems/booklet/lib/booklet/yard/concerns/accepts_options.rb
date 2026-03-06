# frozen_string_literal: true

module Booklet
  module YARD
    module AcceptsOptions
      extend ActiveSupport::Concern

      included do
        def resolve_options(context)
          AcceptsOptions.resolve_options_in_context(context, options_string)
        end

        def options? = options_string.present?
      end

      class << self
        def resolve_options_in_context(context, str)
          opts = if str.start_with?(":")
            options_from_method(str, context)
          elsif str.start_with?("{{")
            options_from_context(str, context)
          elsif str[0].in?(["{", "["])
            options_from_yaml(str)
          elsif str.match?(/\.(json|yml)$/)
            raise "Loading options from files is not supported"
          else
            {}
          end

          opts = opts.is_a?(Array) ? {choices: opts} : opts.to_h
          Options.new(opts)
        end

        private def options_from_yaml(str)
          YAML.safe_load(str)
        end

        private def options_from_method(str, context)
          raise "Cannot resolve options without a context" if context.nil?

          method_name = str.delete_prefix(":").to_sym
          if context.respond_to?(method_name, true)
            context.send(method_name)
          else
            raise NoMethodError, "Unknown method `#{method_name}`"
          end
        end

        private def options_from_context(str, context)
          raise "Cannot resolve options without a context" if context.nil?

          body = str[/\{\{\s?(.*)\s?\}\}$/, 1]
          context.instance_eval(body)
        end
      end
    end
  end
end
