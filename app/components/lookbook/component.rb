module Lookbook
  class Component < ViewComponent::Base
    include Lookbook::ComponentHelper

    def initialize(alpine_data: [], **html_attrs)
      @alpine_data ||= alpine_data
      @html_attrs = html_attrs
      @html_attrs[:class] = {"#{@html_attrs[:class]}": true} if @html_attrs[:class].is_a? String
    end

    def render_component_tag(tag = :div, **attrs, &block)
      merged_classes = class_names(attrs[:class], @html_attrs[:class])
      merge_attrs = @html_attrs.except(:class).deep_merge(attrs.except(:class))
      render Lookbook::TagComponent.new(tag: tag,
        name: component_name,
        **merge_attrs,
        x_data: prepare_alpine_data(attrs[:x_data]),
        class: merged_classes), &block
    end

    def component_name
      self.class.name.chomp("::Component").delete_prefix("Lookbook::").underscore.tr("/", "_").tr("_", "-")
    end

    protected

    attr_reader :alpine_data

    def alpine_component
      nil
    end

    def prepare_alpine_data(x_data = nil)
      component_name = x_data || @html_attrs&.dig(:x_data) || alpine_component
      if component_name.present?
        args = Array.wrap(alpine_data)
        args.any? ? "#{component_name}(#{safe_join(args)})" : component_name
      end
    end
  end
end
