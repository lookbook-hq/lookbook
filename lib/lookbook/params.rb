module Lookbook
  module Params
    class << self
      def build_param(param, default)
        input, options_str = param.text.present? ? param.text.split(" ", 2) : [nil, ""]
        type = param.types&.first
        options = YAML.safe_load(options_str || "~")
        input ||= guess_input(type, default)
        type ||= guess_type(input, default)
        {
          name: param.name,
          input: input_text?(input) ? "text" : input,
          input_type: (input if input_text?(input)),
          options: options,
          type: type,
          default: default
        }
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
        else
          begin
            type_class = "ActiveModel::Type::#{type}".constantize
            type_class.new.cast(value)
          rescue NameError
            raise ArgumentError, "'#{type}' is not a valid param type to cast to."
          end
        end
      end

      private

      def guess_input(type, default)
        if type&.downcase == "boolean" || (type.blank? && boolean?(default))
          "toggle"
        else
          "text"
        end
      end

      def guess_type(input, default)
        if input&.downcase == "toggle"
          "Boolean"
        elsif input&.downcase == "number"
          "Integer"
        elsif boolean?(default)
          "Boolean"
        elsif default.is_a? Symbol
          "Symbol"
        else
          "String"
        end
      end

      def input_text?(input)
        [
          "email",
          "number",
          "tel",
          "text",
          "url"
        ].include? input
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
