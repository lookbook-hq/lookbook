module Lookbook
  # Applies `@param` type coercion to preview parameters at render time.
  #
  # Coercion historically lived only in Lookbook's controller (`set_params`),
  # so entry paths that bypass it - notably ViewComponent's `render_preview`
  # test helper - received raw string params. Prepending this module onto a
  # preview class moves the coercion inside `render_args`, which every entry
  # path funnels through.
  #
  # It is installed on each preview class as that preview is added to the
  # registry, rather than onto `ViewComponent::Preview` itself, so previews
  # outside Lookbook's `preview_paths` and other callers of
  # `Preview.render_args` are left alone. Installing also caches a coercer per
  # scenario, so the render path never consults the preview registry and never
  # triggers a YARD parse of its own.
  #
  # Note that previews are only registered once the preview registry has
  # loaded, which happens during boot unless `lazy_load_previews_and_pages` is
  # enabled. Under that option a preview rendered before anything has touched
  # the registry is not yet installed, and its params are not coerced.
  module PreviewParamCoercion
    def render_args(scenario, params: {})
      super(scenario, params: PreviewParamCoercion.coerce(self, scenario, params))
    end

    class << self
      # Prepend coercion onto a preview class and cache a coercer for each of
      # its scenarios.
      def install(preview_class, preview_entity)
        unless preview_class.singleton_class.include?(PreviewParamCoercion)
          preview_class.singleton_class.prepend(PreviewParamCoercion)
        end
        preview_class.instance_variable_set(:@_lookbook_param_coercers, coercers_for(preview_entity))
      end

      def coerce(preview_class, scenario, params)
        return params if params.nil? || params.empty?

        coercer = coercers(preview_class)[scenario.to_s]
        return params if coercer.nil? || coercer.param_tags.empty?

        coercer.coerce(params)
      rescue => exception
        # Coercion must never raise out of `render_args`: fall back to the
        # original params if anything unexpectedly fails.
        Lookbook.logger.debug("Param coercion skipped: #{exception.message}")
        params
      end

      private

      def coercers(preview_class)
        preview_class.instance_variable_get(:@_lookbook_param_coercers) || {}
      end

      def coercers_for(preview_entity)
        scenario_entities(preview_entity).each_with_object({}) do |scenario, coercers|
          coercers[scenario.name] = ParamsCoercer.new(scenario)
        end
      end

      # Scenarios declared inside an `@!group` are nested one level down in the
      # preview's scenario collection.
      def scenario_entities(preview_entity)
        preview_entity.scenarios.flat_map do |entity|
          entity.is_a?(ScenarioGroupEntity) ? entity.scenarios.to_a : [entity]
        end
      end
    end
  end
end
