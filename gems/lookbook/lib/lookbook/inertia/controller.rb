# frozen_string_literal: true

module Lookbook
  module Inertia
    module Controller
      extend ActiveSupport::Concern

      included do
        helper Inertia::Helper

        after_action do
          cookies["XSRF-TOKEN"] = form_authenticity_token if protect_against_forgery?
        end
      end

      module ClassMethods
        def inertia_share(hash = nil, **props, &block)
          options = extract_inertia_share_options(props)
          return push_to_inertia_share(**(hash || props), &block) if options.empty?

          push_to_inertia_share do
            next if options[:if] && !options[:if].all? { |filter| instance_exec(&filter) }
            next if options[:unless]&.any? { |filter| instance_exec(&filter) }

            next hash unless block

            res = instance_exec(&block)
            hash ? hash.merge(res) : res
          end
        end

        def inertia_config(**attrs)
          config = Inertia::Configuration.new(**attrs)

          if @inertia_config
            @inertia_config.merge!(config)
          else
            @inertia_config = config
          end
        end

        def use_inertia_instance_props
          before_action do
            @_inertia_instance_props = true
            @_inertia_skip_props = view_assigns.keys + ["_inertia_skip_props"]
          end
        end

        def _inertia_configuration
          @_inertia_configuration ||= begin
            config = superclass.try(:_inertia_configuration) || Lookbook::Inertia.configuration
            @inertia_config&.with_defaults(config) || config
          end
        end

        def _inertia_shared_data
          @_inertia_shared_data ||= begin
            shared_data = superclass.try(:_inertia_shared_data)

            if @inertia_share && shared_data.present?
              shared_data + @inertia_share.freeze
            else
              @inertia_share || shared_data || []
            end.freeze
          end
        end

        private

        def push_to_inertia_share(**attrs, &block)
          @inertia_share ||= []
          @inertia_share << attrs.freeze unless attrs.empty?
          @inertia_share << block if block
        end

        def extract_inertia_share_options(props)
          options = props.slice(:if, :unless, :only, :except)

          return options if options.empty?

          if props.except(:if, :unless, :only, :except).any?
            raise ArgumentError,
              "You must not mix shared data and [:if, :unless, :only, :except] options, " \
              "pass data as a hash or a block."
          end

          transform_inertia_share_option(options, :only, :if)
          transform_inertia_share_option(options, :except, :unless)

          options.transform_values! do |filters|
            Array(filters).map!(&method(:filter_to_proc))
          end

          options
        end

        def transform_inertia_share_option(options, from, to)
          if (from_value = options.delete(from))
            filter = Inertia::ActionFilter.new(from, from_value)
            options[to] = Array(options[to]).unshift(filter)
          end
        end

        def filter_to_proc(filter)
          case filter
          when Symbol
            -> { send(filter) }
          when Proc
            filter
          when Inertia::ActionFilter
            -> { filter.match?(self) }
          else
            raise ArgumentError, "You must pass a symbol or a proc as a filter."
          end
        end
      end

      def redirect_to(options = {}, response_options = {})
        capture_inertia_session_options(response_options)
        super
      end

      def inertia_meta
        @inertia_meta ||= Inertia::MetaTagBuilder.new(self)
      end

      private

      def inertia_view_assigns
        return {} unless @_inertia_instance_props

        view_assigns.except(*@_inertia_skip_props)
      end

      def inertia_configuration
        self.class._inertia_configuration.bind_controller(self)
      end

      def inertia_shared_data
        initial_data =
          if session[:inertia_errors].present?
            {errors: session[:inertia_errors]}
          else
            {errors: {}}
          end

        self.class._inertia_shared_data.filter_map do |shared_data|
          if shared_data.respond_to?(:call)
            instance_exec(&shared_data)
          else
            shared_data
          end
        end.reduce(initial_data, &:merge)
      end

      def inertia_location(url)
        headers["X-Inertia-Location"] = url
        head :conflict
      end

      def capture_inertia_session_options(options)
        return unless (inertia = options[:inertia])

        if (inertia_errors = inertia[:errors])
          session[:inertia_errors] = inertia_errors.to_hash
        end

        session[:inertia_clear_history] = inertia[:clear_history] if inertia[:clear_history]
      end
    end
  end
end
