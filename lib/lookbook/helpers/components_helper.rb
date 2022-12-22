module Lookbook
  module ComponentsHelper
    def icon(name, **kwargs)
      lookbook_render :icon, name: name, **kwargs
    end

    def code(language = :html, **kwargs, &block)
      kwargs[:language] ||= language
      lookbook_render :code, **kwargs, &block
    end

    def prose(**kwargs, &block)
      lookbook_render :prose, **kwargs, &block
    end

    def embed(*args, **options)
      return unless args.any?

      preview = if args.first.is_a?(Symbol)
        Engine.previews.find_by_path(args.first)
      else
        Engine.previews.find_by_preview_class(args.first)
      end
      example = args[1] ? preview&.example(args[1]) : preview&.default_example

      render Embed::Component.new(
        example: example,
        params: options.fetch(:params, {}),
        options: options.except(:params)
      )
    end

    def lookbook_tag(tag = :div, **attrs, &block)
      lookbook_render :tag, tag: tag, **attrs, &block
    end

    def lookbook_render(ref, **attrs, &block)
      comp = if ref.is_a? ViewComponent::Base
        ref
      else
        klass = component_class(ref)
        attrs.key?(:content) ? klass.new(**attrs.except(:content)).with_content(attrs[:content]) : klass.new(**attrs)
      end
      if block && !attrs.key?(:content)
        public_send render_method_name, comp, &block
      else
        public_send render_method_name, comp
      end
    end

    private

    COMPONENT_CLASSES = {} # cache for constantized references

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
