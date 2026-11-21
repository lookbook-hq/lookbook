module Lookbook
  # Applies `@param` type coercion to preview parameters at render time.
  #
  # Coercion historically lived only in Lookbook's controller (`set_params`),
  # so entry paths that bypass it - notably ViewComponent's `render_preview`
  # test helper - received raw string params. Prepending this module onto the
  # preview base classes moves the coercion inside `render_args`, which every
  # entry path funnels through.
  #
  # After initialization the render path never scans the registry: as each
  # preview joins the registry, {.install} caches a `ParamsCoercer` per
  # scenario on the preview class, and `render_args` reads that cache. Preview
  # classes the registry does not know about (outside `preview_paths`,
  # third-party callers of `Preview.render_args`) have no cache and pass their
  # params through.
  #
  # Under `lazy_load_previews_and_pages` nothing is installed until the
  # registry loads, so the first render of a class without a cache triggers
  # that load - the one-off YARD parse of all previews that the option defers
  # until first use. Classes that stay unregistered call `Engine.previews` on
  # every render under that option; after the first call it is a memoised
  # check.
  module PreviewParamCoercion
    def render_args(scenario, params: {})
      super(scenario, params: lookbook_coerce_params(scenario, params))
    end

    class << self
      # Cache a coercer for each of the preview class's scenarios.
      def install(preview_class, preview_entity)
        coercers = preview_entity.scenarios.flat_map(&:scenarios).each_with_object({}) do |scenario, hash|
          hash[scenario.name] = ParamsCoercer.new(scenario)
        end
        preview_class.instance_variable_set(:@_lookbook_param_coercers, coercers)
      end
    end

    private

    def lookbook_coerce_params(scenario, params)
      return params if params.nil? || params.empty?

      coercer = lookbook_param_coercers[scenario.to_s]
      return params if coercer.nil? || coercer.param_tags.empty?

      coercer.cast(params)
    end

    def lookbook_param_coercers
      if @_lookbook_param_coercers.nil? && Lookbook.config.lazy_load_previews_and_pages
        # Loading the registry installs the cache on every registered preview.
        Engine.previews
      end
      @_lookbook_param_coercers || {}
    end
  end
end
