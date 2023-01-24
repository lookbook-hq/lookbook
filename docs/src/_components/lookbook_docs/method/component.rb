module LookbookDocs
  class Method::Component < Base
    attr_reader :name, :signature_call, :signature_args, :wrap_args,
      :id, :scope, :klass, :params, :options, :example, :example_lang

    def initialize(name:, signature_call: nil, signature_args: nil, wrap_args: true, description: nil,
      scope: "global", klass: nil, params: [], options: [], example: nil, example_lang: :erb, show: [], **attrs)
      @name = name
      @signature_call = signature_call ? signature_call.strip : name
      @signature_args = signature_args.strip if signature_args
      @description = description
      @id = attrs[:id]
      @scope = scope
      @klass = klass
      @params = params
      @options = options
      @example = example
      @example_lang = example_lang
      @show = show.to_a
      @wrap_args = wrap_args
      @attrs = attrs
    end

    def description_lines
      @description.present? ? @description.split("\n\n") : []
    end

    def summary
      "#{description_lines.first.strip.chomp(".")}." if description_lines.present?
    end

    def description
      lines = description_lines
      lines.shift
      "#{lines.join("\n").strip.chomp(".")}." if lines.any?
    end

    def show?(name)
      @show.empty? || @show.include?(name)
    end

    def return_types
      types = @attrs[:return_types] || @attrs[:types]
      types.gsub("&lt;", "<").gsub("&gt;", ">").tr(" ", "") if types.present?
    end

    def returns?
      !@attrs[:return_types].nil?
    end

    def rendered_example
      if example
        markdown("```#{example_lang}\n#{example.strip_heredoc.strip.html_safe}\n```")
      end
    end

    def scope_identifier
      case scope
      when "global"
        ""
      when "class"
        klass.present? ? "#{klass}." : "#"
      when "instance"
        "#"
      end
    end

    def api_links
      return unless return_types

      return_types.split(",").map do |klass|
        lookup_class = klass.strip.gsub("Array", "").tr("<>", "")
        url = api_module_url(lookup_class)
        [lookup_class, url] if url
      end.compact
    end
  end
end
