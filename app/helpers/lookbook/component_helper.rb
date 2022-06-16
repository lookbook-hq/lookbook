module Lookbook
  module ComponentHelper
    COMPONENT_CLASSES = {} # cache for constantized references

    def icon(name, **attrs)
      render Lookbook::Icon::Component.new(name: name, **attrs)
    end

    def render_component(ref, **attrs, &block)
      klass = component_class(ref)
      comp = attrs.key?(:content) ? klass.new(**attrs.except(:content)).with_content(attrs[:content]) : klass.new(**attrs)
      render comp, &block
    end

    def render_tag(tag = :div, **attrs, &block)
      render Lookbook::TagComponent.new(tag: tag, **attrs), &block
    end

    if Rails.version.to_f < 6.1
      def class_names(*args)
        tokens = build_tag_values(*args).flat_map { |value| value.to_s.split(/\s+/) }.uniq
        safe_join(tokens, " ")
      end
    end

    private

    def component_class(ref)
      klass = COMPONENT_CLASSES[ref]
      if klass.nil?
        ref = ref.to_s.tr("-", "_")
        class_namespace = ref.camelize
        begin
          klass = "Lookbook::#{class_namespace}::Component".constantize
        rescue
          klass = "Lookbook::#{class_namespace}Component".constantize
        end
        COMPONENT_CLASSES[ref] = klass
      end
      klass
    end

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
