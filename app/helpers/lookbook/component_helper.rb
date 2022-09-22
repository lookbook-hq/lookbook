module Lookbook
  module ComponentHelper
    COMPONENT_CLASSES = {} # cache for constantized references

    def icon(name, **attrs)
      lookbook_render :icon, name: name, **attrs
    end

    def code(language = :html, **attrs, &block)
      attrs[:language] ||= language
      lookbook_render :code, **attrs, &block
    end

    def lookbook_tag(tag = :div, **attrs, &block)
      lookbook_render :tag, tag: tag, **attrs, &block
    end

    def lookbook_render(ref, **attrs, &block)
      comp = if ref.is_a? ViewComponent::Base
        ref
      else
        klass = component_class(ref)
        comp = attrs.key?(:content) ? klass.new(**attrs.except(:content)).with_content(attrs[:content]) : klass.new(**attrs)
      end
      public_send render_method_name, comp, &block unless attrs.key?(:content)
    end

    unless respond_to? :class_names
      def class_names(*args)
        tokens = build_tag_values(*args).flat_map { |value| value.to_s.split(/\s+/) }.uniq

        safe_join(tokens, " ")
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

    private

    def render_method_name
      if Rails.application.config.view_component.render_monkey_patch_enabled || Rails.version.to_f >= 6.1
        :render
      else
        :render_component
      end
    end

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
  end
end
