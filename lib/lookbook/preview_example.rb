module Lookbook
  class PreviewExample
    include Taggable

    attr_reader :name

    def initialize(name, preview)
      @name = name
      @preview = preview
    end

    def id
      path.underscore.tr("/", "-").tr("_", "-")
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
        Lookbook::Params.build_param(param, parameter_defaults[param.name])
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
      @parameter_defaults || code_object&.parameters&.map do |param_str|
        Lookbook::Params.parse_method_param_str(param_str)
      end.to_h
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
