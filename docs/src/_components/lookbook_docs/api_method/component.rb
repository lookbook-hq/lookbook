module LookbookDocs
  class ApiMethod::Component < Base
    def initialize(tags: [], **attrs)
      @tags = tags
      @attrs = attrs
    end

    def example
      tags(:example).first&.text
    end

    def example_lang
      tags(:example).first&.name.presence || "erb"
    end

    def params
      tags(:param)
      # .map do |param|
      #   param[:opts] = options_for_param(param[:name])
      #   param
      # end
    end

    def options(name = :opts)
      options_for_param(name)
    end

    def options_for_param(param_name)
      tags(:option).filter { |opt| opt[:pair].to_s == param_name.to_s }
    end

    def tags(tag_name = nil)
      tag_name ? @tags.filter { |t| t[:tag_name].to_s == tag_name.to_s } : @tags
    end
  end
end
