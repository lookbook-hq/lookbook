# frozen_string_literal: true

module Lookbook
  module Inertia
    class Configuration
      DEFAULTS = {
        component_path_resolver: ->(path:, action:) { "#{path.gsub("lookbook/", "")}/#{action}" },

        prop_transformer: lambda do |props:|
          props = props.deep_transform_keys { _1.to_s.camelize(:lower) }
          props.deep_transform_values! { _1.try(:to_inertia) || _1 }
        end,

        version: Lookbook::VERSION
      }.freeze

      OPTION_NAMES = DEFAULTS.keys.freeze

      class << self
        def default
          new(**DEFAULTS)
        end
      end

      protected attr_reader :controller
      protected attr_reader :options

      def initialize(controller: nil, **attrs)
        @controller = controller
        @options = attrs.extract!(*OPTION_NAMES)

        return if attrs.empty?

        raise ArgumentError, "Unknown options for #{self.class}: #{attrs.keys}"
      end

      def bind_controller(controller)
        Configuration.new(**@options, controller: controller)
      end

      def freeze
        @options.freeze
        super
      end

      def merge!(config)
        @options.merge!(config.options)
        self
      end

      def merge(config)
        Configuration.new(**@options, **config.options)
      end

      # Internal: Finalizes the configuration for a specific controller.
      def with_defaults(config)
        @options = config.options.merge(@options)
        freeze
      end

      def component_path_resolver(path:, action:)
        @options[:component_path_resolver].call(path: path, action: action)
      end

      def prop_transformer(props:)
        @options[:prop_transformer].call(props: props)
      end

      OPTION_NAMES.each do |option|
        unless method_defined?(option)
          define_method(option) do
            evaluate_option options[option]
          end
        end
        define_method("#{option}=") do |value|
          @options[option] = value
        end
      end

      private

      def evaluate_option(value)
        return value unless value.respond_to?(:call)
        return value.call unless controller

        controller.instance_exec(&value)
      end
    end
  end
end
