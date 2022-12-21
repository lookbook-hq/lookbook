module LookbookDocs
  class ApiMethod::Component < Base
    attr_reader :name, :signature_call, :signature_args, :description,
      :return_types, :id, :scope, :klass

    def initialize(name:, signature_call:, signature_args:, description: nil,
      return_types: nil, tags: [], scope: "instance", klass: nil, **attrs)
      @name = name
      @signature_call = signature_call.strip
      @signature_args = signature_args.strip
      @description = description
      @return_types = return_types
      @tags = tags
      @id = attrs[:id]
      @scope = scope
      @klass = klass
      @attrs = attrs
    end

    def params
      tags(:param)
    end

    def options
      tags(:option)
    end

    def tags(tag_name = nil)
      tag_name ? @tags.filter { |t| t[:tag_name].to_s == tag_name.to_s } : @tags
    end
  end
end
