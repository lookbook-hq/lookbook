module Lookbook
  module ComponentHelper
    def render_component(name, **attrs, &block)
      attrs[:classes] = class_names(attrs[:class])
      render "lookbook/components/#{name.underscore}", **attrs.except(:class), &block
    end

    def icon(name, size: 4, **attrs)
      render_component "icon", name: name, size: size, **attrs
    end

    if Rails.version.to_f < 6.1
      def class_names(*args)
        tokens = build_tag_values(*args).flat_map { |value| value.to_s.split(/\s+/) }.uniq
        safe_join(tokens, " ")
      end
    end

    alias_method :component, :render_component

    private

    def build_tag_values(*args)
      tag_values = []
      args.each do |tag_value|
        case tag_value
        when Hash
          tag_value.each do |key, val|
            tag_values << key.to_s if val && key.present?
          end
        when Array
          tag_values.concat build_tag_values(*tag_value)
        else
          tag_values << tag_value.to_s if tag_value.present?
        end
      end
      tag_values
    end
  end
end
