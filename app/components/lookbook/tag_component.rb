module Lookbook
  class TagComponent < ViewComponent::Base
    include Lookbook::ComponentHelper

    def initialize(tag: :div, name: nil, cloak: false, **html_attrs)
      @tag = tag
      html_attrs[:data] ||= {}
      html_attrs[:data][:component] = name if name.present?
      html_attrs[:x_cloak] = true if cloak == true
      @html_attrs = convert_attrs(html_attrs)
    end

    def call
      tag.public_send(@tag, **@html_attrs) do
        content
      end
    end

    protected

    def convert_attrs(html_attrs)
      html_attrs.map do |name, value|
        [name.to_s.tr("_", "-"), value]
      end.to_h
    end
  end
end
