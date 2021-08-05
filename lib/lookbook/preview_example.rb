module Lookbook
  class PreviewExample

    attr_reader :name

    def initialize(name, code_object)
      @name = name
      @code_object = code_object
    end

    def label
      name.titleize.strip
    end

    def notes
      @code_object.docstring.to_s.strip
    end

    def method_source
      @code_object.source.split("\n")[1..-2].join("\n").strip_heredoc
    end

    def template_source(template_path)
      File.read(full_template_path(template_path))
    end

    def template_lang(template_path)
      File.extname(full_template_path(template_path)).sub(".", "")
    end

    def hidden?
      hidden_tag = @code_object.tags(:hidden).first
      hidden_tag.present? && hidden_tag.text.strip != "false"
    end

    private

    def full_template_path(template_path)
      base_path = Array(ViewComponent::Base.preview_paths).detect do |p|
        Dir["#{p}/#{template_path}.html.*"].first
      end
      Pathname.new(Dir["#{base_path}/#{template_path}.html.*"].first)
    end

  end
end