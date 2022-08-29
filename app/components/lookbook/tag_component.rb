module Lookbook
  class TagComponent < ViewComponent::Base
    include Lookbook::ComponentHelper

    def initialize(tag: :div, name: nil, cloak: false, **html_attrs)
      @tag = tag
      html_attrs[:data] ||= {}
      html_attrs[:data][:component] = name if name.present?
      html_attrs[:"x-cloak"] = true if cloak == true
      html_attrs[self.class.escape_attribute_key] = false
      @html_attrs = html_attrs
    end

    def call
      tag.public_send(@tag.to_sym, **@html_attrs) do
        content
      end
    end

    def self.escape_attribute_key
      @escape_attribute_key ||= Gem::Version.new(Rails.version) < Gem::Version.new("6.1.5.1") ? :escape_attributes : :escape
    end
  end
end
