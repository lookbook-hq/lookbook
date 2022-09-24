require "active_model"

module Lookbook
  module Params
    TYPE_MATCH_REGEXP = /^(\[\s?([A-Z]{1}\w+)\s?\])/

    class << self
      def build_param(param, default: nil, eval_scope: nil)
        text = (param.text.presence || "").strip

        type = nil
        type_match = text.match(TYPE_MATCH_REGEXP)
        unless type_match.nil?
          type = type_match[2]
          text.gsub!(TYPE_MATCH_REGEXP, "").strip!
        end

        text, options_str = Lookbook::TagOptions.extract_options(text)
        input, rest = text.split(" ", 2)

        tag_options = Lookbook::TagOptions.new(options_str,
          base_dir: (File.dirname(param.object.files.first[0]) if param.object.files.any?),
          eval_scope: eval_scope)

        type ||= tag_options.option(:type)
        input ||= guess_input(type, default)
        type ||= guess_type(input, default)

        {
          name: param.name,
          input: input_text?(input) ? "text" : input,
          type: (input if input_text?(input)),
          options: tag_options.options,
          value_type: type,
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
        elsif ["date", "datetime-local"].include?(input&.downcase) || default.is_a?(DateTime)
          "DateTime"
        else
          "String"
        end
      end

      def input_text?(input)
        [
          "date",
          "datetime-local",
          "email",
          "number",
          "tel",
          "text",
          "url"
        ].include? input.to_s
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
