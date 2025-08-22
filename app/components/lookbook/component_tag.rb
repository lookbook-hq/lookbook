module Lookbook
  class ComponentTag
    SELF_CLOSING_TAGS = %i[area base br col embed hr img input link meta param source track wbr].freeze

    def initialize(tag_name = nil, **tag_attrs, &block)
      @tag_name = tag_name || :div
      @tag_attrs = tag_attrs
      @block = block
    end

    def render_in(view_context, &block)
      if SELF_CLOSING_TAGS.include?(@tag_name)
        view_context.tag.public_send(@tag_name, **@tag_attrs)
      else
        view_context.content_tag(@tag_name, **@tag_attrs, &block || @block)
      end
    end
  end
end
