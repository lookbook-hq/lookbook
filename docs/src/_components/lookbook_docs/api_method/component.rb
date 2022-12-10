module LookbookDocs
  class ApiMethod::Component < Base
    attr_reader :name, :signature, :description, :return_types, :id

    def initialize(name:, signature:, description: nil, return_types: nil, tags: [], **attrs)
      @name = name
      @signature = signature
      @description = description
      @return_types = return_types
      @tags = tags
      @id = attrs[:id]
      @attrs = attrs
    end

    def params
      tags(:param)
    end

    def tags(tag_name = nil)
      tag_name ? @tags.filter { |t| t[:tag_name].to_s == tag_name.to_s } : @tags
    end
  end
end
