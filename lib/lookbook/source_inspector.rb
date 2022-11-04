module Lookbook
  class SourceInspector
    include Utils

    attr_reader :code_object
    delegate :groups, :source, to: :@code_object, allow_nil: true

    def initialize(code_object, eval_scope: nil)
      @code_object = code_object
      @eval_scope = eval_scope
    end

    def hidden?
      @hidden ||= tag_value(:hidden) || false
    end

    def id
      @id ||= tag_value(:id)
    end

    def label
      @label ||= tag_value(:label)
    end

    def notes
      @notes ||= code_object.docstring&.to_s&.strip
    end

    def group
      @group ||= code_object.group
    end

    def position
      @position ||= tag_value(:position) || 10000
    end

    def components
      @components ||= Array(code_object.tags(:component)).map(&:value)
    end

    def logical_path
      path = tag_value(:logical_path)
      path&.delete_prefix("/")&.delete_suffix("/")
    end

    def display_options
      return @display_options unless @display_options.nil?

      # Dynamic params set at the entity level are
      # not (yet?) supported so filter them out.
      display_tags = Array(code_object.tags(:display)).select do |tag|
        !(tag.value.is_a?(Array) || tag.value.is_a?(Hash))
      end

      display_tags.map { |tag| [tag.key.to_sym, tag.value] }.to_h
    end

    def methods
      @methods ||= code_object.meths
    end

    def tags(name = nil)
      code_object.tags(name)
    end

    def tag(name = nil)
      tags(name).first
    end

    protected

    def tag_value(tag_name)
      code_object.tag(tag_name).value if code_object.has_tag?(tag_name)
    end
  end
end
