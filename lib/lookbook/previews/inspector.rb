module Lookbook
  module Inspector
    class << self
      include Loggable

      def display_options_defaults
        @display_options_defaults ||= begin
          defaults = Lookbook.config.preview_display_options.select { !_2.is_a?(Array) && !_2.is_a?(Hash) }
          DataObject.new(defaults)
        end
      end

      def dynamic_display_options
        @dynamic_display_options ||= begin
          options = Lookbook.config.preview_display_options.select { _2.is_a?(Array) || _2.is_a?(Hash) }
          options.symbolize_keys.map do |key, value|
            label = key.to_s.titleize
            option_data = DataObject.new(name: key)

            if value.is_a?(Array)
              first_choice_value = value.first.is_a?(Array) ? value.first.last : value.first
              option_data.tap do |option|
                option.label = label
                option.choices = value
                option.default_value = first_choice_value
              end
            elsif value.is_a?(Hash)
              first_choice_value = value[:choices].first.is_a?(Array) ? value[:choices].first.last : value[:choices].first
              option_data.tap do |option|
                option.label = value[:label] || label
                option.choices = value[:choices] || []
                option.default_value = value[:default] || first_choice_value
              end
            end

            [key, option_data]
          end.compact.to_h
        end
      end

      def preview_panels(*args)
        names = args.any? ? args : Lookbook.config.inspector_preview_panels
        names = names.flatten.map(&:to_sym)
        panels.select { names.include?(_1.name) }
      end

      def drawer_panels(*args)
        names = args.any? ? args : Lookbook.config.inspector_drawer_panels
        names = names.flatten.map(&:to_sym)
        panels.select { names.include?(_1.name) }
      end

      def embed_panels(*args)
        names = args.any? ? args : Lookbook.config.inspector_embed_panels
        names = names.flatten.map(&:to_sym)
        panels.select { names.include?(_1.name) }
      end

      def param_input(input_type)
        param_inputs.find { _1.name == input_type.to_sym } || param_input(:text)
      end

      def param_inputs
        @param_inputs ||= Lookbook.config.inspector_param_inputs.map do |name, opts|
          DataObject.new(
            name: Utils.name(name, true),
            partial: opts.partial,
            options: opts.except(:partial)
          )
        end
      end

      def panels
        @panels ||= Lookbook.config.inspector_panels.map do |name, opts|
          DataObject.new(
            name: Utils.name(name, true),
            label: Utils.label(opts.label || name),
            partial: opts.partial,
            options: opts.except(:label, :partial)
          )
        end
      end
    end
  end
end
