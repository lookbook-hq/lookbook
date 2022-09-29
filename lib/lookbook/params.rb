require "active_model"

module Lookbook
  module Params
    VALUE_TYPE_MATCH_REGEXP = /^(\[\s?([A-Z]{1}\w+)\s?\])/

    PARAM_OPTION_KEYS = %i{name, input label hint description value_type value_default}.freeze

    INPUT_HANDLERS = {
      select: "Lookbook::Params::SelectComponent",
      textarea: "Lookbook::Params::TextAreaComponent",
      toggle: "Lookbook::Params::ToggleComponent",
      text: "Lookbook::Params::TextComponent",
      email: "Lookbook::Params::TextComponent",
      number: "Lookbook::Params::TextComponent",
      tel: "Lookbook::Params::TextComponent",
      url: "Lookbook::Params::TextComponent",
      date: "Lookbook::Params::TextComponent",
      'datetime-local': "Lookbook::Params::TextComponent",
    }.freeze

    class << self
      def build_param(param, default: nil, eval_scope: nil)
        
        input, value_type, options_str, rest = parse_param_tag_text(param.text)

        tag_options = Lookbook::TagOptions.new(options_str,
          base_dir: (File.dirname(param.object.files.first[0]) if param.object.files.any?),
          eval_scope: eval_scope).options

        if tag_options.is_a? Array
          # handle special case legacy situation for selects where
          # options are an array of choices rather than a Hash
          tag_options = { choices: tag_options }
        end

        param_options = tag_options.select { |key| PARAM_OPTION_KEYS.include? key }
        input_options = tag_options.except(*PARAM_OPTION_KEYS)

        value_type ||= param_options[:value_type]
        input ||= param_options[:input] || guess_input(value_type, default)

        {
          name: param.name.to_s,
          label: param_options[:label] || param.name.titleize,
          hint: param_options[:hint],
          description: param_options[:description],
          input: input.to_s,
          input_options: input_options,
          value: nil,
          value_type: value_type ||= guess_value_type(input, default),
          value_default: default
        }
      end

      # Parses param tag strings with the format: `[<value_type>] <input> <opts?>`
      def parse_param_tag_text(text)
        text = (text.presence || "").strip

        value_type = nil
        value_type_match = text.match(VALUE_TYPE_MATCH_REGEXP)
        unless value_type_match.nil?
          value_type = value_type_match[2]
          text.gsub!(VALUE_TYPE_MATCH_REGEXP, "").strip!
        end

        text, options_str = Lookbook::TagOptions.extract_options(text)
        input, rest = text.split(" ", 2)

        [input, value_type, options_str, rest]
      end

      def parse_method_param_str(param_str)
        return nil if param_str[0].nil? || param_str[1].nil?
        name = param_str[0].chomp(":")
        value = param_str[1]&.strip
        value = case value
        when "nil"
          nil
        else
          if value&.first == ":"
            value.delete_prefix(":").to_sym
          else
            YAML.safe_load(value)
          end
        end
        [name, value]
      end

      def cast(value, type = "String")
        case type.downcase
        when "symbol"
          value.presence&.delete_prefix(":")&.to_sym
        when "hash"
          result = safe_parse_yaml(value, {})
          unless result.is_a? Hash
            Lookbook.logger.debug "Failed to parse '#{value}' into a Hash"
            result = {}
          end
          result
        when "array"
          result = safe_parse_yaml(value, [])
          unless result.is_a? Array
            Lookbook.logger.debug "Failed to parse '#{value}' into an Array"
            result = []
          end
          result
        when "datetime"
          begin
            result = DateTime.parse(value)
          rescue Date::Error
            Lookbook.logger.debug "Failed to parse '#{value}' into a DateTime"
            result = DateTime.now
          end
          result
        else
          begin
            type_class = "ActiveModel::Type::#{type}".constantize
            type_class.new.cast(value)
          rescue NameError
            raise ArgumentError, "'#{type}' is not a valid param type to cast to."
          end
        end
      end

      def inputs
        @inputs ||= Lookbook.config.preview_param_inputs.map do |name, config|
          target = config[:render_target]
          if target.is_a? String
            target = begin
              target.constantize
            rescue
              target
            end
          end
          [name, {**config, render_target: target}]
        end.to_h
      end

      private

      def guess_input(value_type, default)
        if value_type&.downcase == "boolean" || (value_type.blank? && boolean?(default))
          "toggle"
        else
          "text"
        end
      end

      def guess_value_type(input, default)
        if input&.downcase == "toggle"
          "Boolean"
        elsif input&.downcase == "number"
          "Integer"
        elsif boolean?(default)
          "Boolean"
        elsif default.is_a? Symbol
          "Symbol"
        elsif ["date", "datetime-local"].include?(input&.downcase) || default.is_a?(DateTime)
          "DateTime"
        else
          "String"
        end
      end

      def safe_parse_yaml(value, fallback)
        value.present? ? YAML.safe_load(value) : fallback
      rescue Psych::SyntaxError
        fallback
      end

      def boolean?(value)
        value == true || value == false
      end
    end
  end
end
