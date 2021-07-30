
module Lookbook
  class PreviewExample

    attr_reader :name

    def initialize(name, preview_name)
      @name = name
      @preview_name = preview_name
    end

    def notes
      code_object.docstring.to_s.strip
    end

    def method_source
      code_object.source.split("\n")[1..-2].join("\n").strip_heredoc
    end

    def template_source(template_path)
      File.read(full_template_path(template_path))
    end

    def template_lang(template_path)
      File.extname(full_template_path(template_path)).sub(".", "")
    end

    private

    def code_object
      @code_object ||= Lookbook::Engine.parser.find("#{@preview_name}##{@name}")
    end

    def full_template_path(template_path)
      base_path = Array(ViewComponent::Base.preview_paths).detect do |p|
        Dir["#{p}/#{template_path}.html.*"].first
      end
      Pathname.new(Dir["#{base_path}/#{template_path}.html.*"].first)
    end

  end
end