module Lookbook
  class PreviewMetadata
    delegate :has_tag?, :group, to: :code_object

    def initialize(code_object)
      @code_object = code_object
    end

    def notes
      code_object.docstring.to_s.strip
    end

    def notes? = notes.present?

    def tags(name = nil)
      code_object.tags(name)
    end

    def tag(name = nil)
      tags(name).first
    end

    def method_missing(name, *args, &block)
      tag_value(name) if has_tag?(name.to_s)
    end

    def respond_to_missing?(name, include_private = false)
      has_tag?(name.to_s) || super
    end

    protected

    attr_reader :code_object

    def tag_value(name)
      tag(name).value if has_tag?(name)
    end
  end
end
