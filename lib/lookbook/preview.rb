require_relative "../../vendor/gems/method_source-1.0.0/lib/method_source"

module Lookbook
  module Preview
    
    def label
      normalized_name.split("/").last.titleize.strip
    end

    def pretty_path
      path_parts.map(&:titleize).join("/")
    end

    def normalized_name
      name.chomp("ComponentPreview").chomp("::").underscore
    end

    def path_parts
      parts = normalized_name.split("/")
      parts.first parts.size - 1
    end

    def preview_method_source(example_name)
      klass = name.constantize.new
      code = klass.method(example_name.to_sym).source.split("\n")[1..-2].join("\n")
      code.strip_heredoc
    end

    def preview_template_source(template_path)
       File.read(preview_example_template_full_path(template_path))
    end

    def preview_comment(example_name)
      klass = name.constantize.new
      comment = klass.method(example_name.to_sym).comment
      text = comment.split("\n").map { |line| line.sub(/^# /, '') }
      text.join("\n").strip_heredoc
    end

    def preview_example_template_full_path(template_path)
      preview_path = Array(preview_paths).detect do |preview_path|
        Dir["#{preview_path}/#{template_path}.html.*"].first
      end
      Pathname.new(Dir["#{preview_path}/#{template_path}.html.*"].first)
    end

    def unsorted_examples
      public_instance_methods(false).map(&:to_s)
    end

  end
end
