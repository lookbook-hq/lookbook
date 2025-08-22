module Lookbook
  class Component
    include TagHelper

    ViewContextHelper = Struct.new(:name, :handler)

    COMPONENT_TAG_ATTRS = %i[id class style data aria role src href action method].freeze
    SLOT_METHODS = %i[get_slot get_slots set_slot]

    attr_reader :content, :view_context, :content_tag_attributes

    def initialize(id: nil, **kwargs)
      @id = id
      @kwargs = kwargs
      @content = nil
    end

    def content?
      content.present?
    end

    def id
      @id.to_s.downcase.dasherize unless @id.nil?
    end

    def component_tag(tag_name = nil, **html_attributes, &block)
      attrs = mix_tag_attributes(
        @kwargs[:html] || {},
        tag_attrs_from_kwargs,
        {
          id: dom_id,
          data: {
            component: component_name.dasherize
          }
        },
        html_attributes
      )

      view_context.render ComponentTag.new(tag_name || :div, **attrs), &block
    end

    def component_name
      self.class.name.demodulize.delete_suffix("Component").underscore
    end

    def render_in(vc, &block)
      @view_context = decorate_view_context!(vc.dup)

      @content = view_context.capture { yield self } if block_given?
      view_context.render partial: component_partial_path, object: self
    end

    alias_method :dom_id, :id

    protected

    def tag_attrs_from_kwargs
      @kwargs.select { _1.in?(COMPONENT_TAG_ATTRS) || _1.start_with?("x-") }
    end

    def decorate_view_context!(view_context)
      view_context_helpers.each do |meth|
        view_context.define_singleton_method(meth.name, &meth.handler)
      end
      view_context
    end

    def view_context_helpers
      meths = self.class.instance_methods(false).select do |name|
        !SLOT_METHODS.include?(name) &&
          !name.start_with?("_", "with_") &&
          !name.end_with?("=")
      end
      meths.push(:component_tag, :content?, :content, :id)
      meths.uniq.map { ViewContextHelper.new(_1, method(_1)) }
    end

    def component_partial_path
      "lookbook/components/#{component_name}"
    end
  end
end
