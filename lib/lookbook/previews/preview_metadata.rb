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

    def status(default: nil)
      status_name = fetch(:status, default)
      Previews.statuses.find { _1.name == status_name.to_sym } if status_name
    end

    def display_options
      DataObject.new(tags(:display).map { [_1.key, _1.value] })
    end

    def tags(name = nil)
      code_object.tags(name.to_s)
    end

    def tag(name = nil)
      tags(name).first
    end

    def fetch(name, fallback)
      if has_tag?(name.to_s)
        tag_value(name)
      else
        fallback
      end
    end

    def method_missing(name, *args, &block)
      tag_value(name)
    end

    def respond_to_missing?(name, include_private = false)
      has_tag?(name.to_s) || super
    end

    protected

    attr_reader :code_object

    def tag_value(name)
      tag(name.to_s).value if has_tag?(name.to_s)
    end
  end
end
