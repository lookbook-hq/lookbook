module Lookbook
  class ScenarioParam
    PARAM_OPTIONS = %i[label description hint choices]

    def initialize(tag, scenario)
      @tag = tag
      @scenario = scenario
    end

    def name
      tag.param_name
    end

    def label
      options.fetch(:label, name.to_s.titleize)
    end

    def description
      tag.description.presence || options[:description]
    end

    def hint
      options[:hint]
    end

    def value_type
      tag.value_type || guess_value_type
    end

    def input_type
      tag.input_type || guess_input_type
    end

    def input_options
      options.except(*PARAM_OPTIONS)
    end

    def input_choices
      options.fetch(:choices, [])
    end

    def default_value
      @default_value ||= begin
        return nil unless default_value?
        proc {
          preview_class_instance.instance_eval(method_parameter_data.value)
        }.call
      end
    end

    def default_value_string
      unless default_value.nil?
        ParamValueStringifier.call(default_value)
      end
    end

    def default_value?
      method_parameter_data.present?
    end

    def cast_value(value_str)
      return value_str unless value_str.is_a?(String)
      ParamValueParser.call(value_str, value_type)
    end

    def options
      @options ||= begin
        opts_str = tag.options_str

        return {} if opts_str.blank?

        opts = if opts_str.start_with?(":")
          resolve_method_options
        elsif opts_str.start_with?("{{")
          resolve_eval_options
        elsif opts_str[0].in?(["{", "["])
          resolve_yaml_options
        elsif opts_str.match?(/\.(json|yml)$/)
          resolve_file_options
        else
          {}
        end

        opts = opts.is_a?(Array) ? {choices: opts} : opts.to_h
        opts.deep_symbolize_keys
      end
    end

    protected

    def resolve_yaml_options
      YAML.safe_load(tag.options_str)
    end

    def resolve_method_options
      method_name = tag.options_str.delete_prefix(":").to_sym
      preview = preview_class_instance
      if preview.respond_to?(method_name, true)
        preview.send(method_name)
      else
        raise NoMethodError, "No method '#{method_name}' found for #{scenario.preview.preview_class_name}"
      end
    end

    def resolve_eval_options
      code_str = tag.options_str[/\{\{\s?(.*)\s?\}\}$/, 1]
      proc { preview_class_instance.instance_eval(code_str) }.call
    end

    def resolve_file_options
      raise "Loading scenario options from files is no longer supported"
    end

    def preview_class_instance
      scenario.preview.preview_class.new
    end

    def method_parameter_data
      if scenario.method_parameters[name]
        DataObject.new({name: name, value: scenario.method_parameters[name]})
      end
    end

    def guess_input_type
      if tag.value_type == :boolean || (tag.value_type.nil? && Utils.boolean?(default_value))
        :checkbox
      else
        :text
      end
    end

    def guess_value_type
      if input_type.in?([:toggle, :checkbox])
        :boolean
      elsif input_type == :number
        :integer
      elsif Utils.boolean?(default_value)
        :boolean
      elsif default_value.is_a?(Symbol)
        :symbol
      elsif input_type.in?([:date, :"datetime-local"]) || default_value.is_a?(DateTime)
        :datetime
      else
        :string
      end
    end

    attr_reader :tag, :scenario
  end
end
