module Lookbook
  module Inspector
    class << self
      include Loggable

      def default_display_options
        @default_display_options ||= begin
          options = Lookbook.config.preview_display_options.map do |key, value|
            [key, value] unless value.is_a?(Array) || value.is_a?(Hash)
          end.to_h
          DataObject.new(options)
        end
      end

      def dynamic_display_options
        @dynamic_display_options ||= begin
          options = Lookbook.config.preview_display_options.symbolize_keys
          DataObject.new(options.except(*default_display_options.keys))
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
