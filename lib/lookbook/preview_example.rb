module Lookbook
  class PreviewExample
    include Taggable

    attr_reader :name

    def initialize(name, preview)
      @name = name
      @preview = preview
    end

    def id
      path.underscore.tr("_", "-")
    end

    def path
      "#{@preview.lookbook_path}/#{name}"
    end

    def label
      lookbook_label.presence || name.titleize
    end

    def display_params
      @preview.display_params.merge(lookbook_display_params)
    end

    def params
      @params || code_object&.tags("param")&.map do |param|
        input, options_str = param.text.present? ? param.text.split(" ", 2) : [nil, ""]
        options = YAML.safe_load(options_str || "~")
        type = param.types&.first
        input ||= type == "Boolean" ? "toggle" : "text"
        type ||= input == "toggle" ? "Boolean" : "String"
        {
          name: param.name,
          input: input_text?(input) ? "text" : input,
          input_type: (input if input_text?(input)),
          options: options,
          type: type,
          default: parameter_defaults[param.name]
        }
      end
    end

    def method_source
      code_object.source.split("\n")[1..-2].join("\n").strip_heredoc
    end

    def source_lang
      Lookbook::Lang.find(:ruby)
    end

    def template_source(template_path)
      File.read(full_template_path(template_path))
    end

    def template_lang(template_path)
      Lookbook::Lang.guess(full_template_path(template_path)) || Lookbook::Lang.find(:html)
    end

    def type
      :example
    end

    def matchers
      [@preview.label, label].map { |m| m.gsub(/\s/, "").downcase }
    end

    def hierarchy_depth
      @preview.lookbook_hierarchy_depth + 1
    end

    private

    def parameter_defaults
      @parameter_defaults || code_object&.parameters&.map do |parsed_param|
        name = parsed_param[0].chomp(":")
        value = parsed_param[1].strip
        value = case value
        when "nil"
          ""
        when "true"
          "true"
        when "false"
          "false"
        else
          if value.first == ":"
            value.delete_prefix(":")
          else
            str_match = value.match(/^["'](.+)["']$/)
            str_match ? str_match[1] : ""
          end
        end
        [name, value]
      end.to_h
    end

    def input_text?(input_type)
      [
        "color",
        "date",
        "datetime-local",
        "email",
        "hidden",
        "month",
        "number",
        "password",
        "range",
        "tel",
        "text",
        "time",
        "url",
        "week"
      ].include? input_type
    end

    def taggable_object_path
      "#{@preview.name}##{name}"
    end

    def full_template_path(template_path)
      base_path = Array(Lookbook.config.preview_paths).detect do |p|
        Dir["#{p}/#{template_path}.html.*"].first
      end
      Pathname.new(Dir["#{base_path}/#{template_path}.html.*"].first)
    end

    alias_method :group, :lookbook_group
    alias_method :notes, :lookbook_notes
    alias_method :hidden?, :lookbook_hidden?
  end
end
