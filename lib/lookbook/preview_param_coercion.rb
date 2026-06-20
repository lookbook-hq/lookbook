module Lookbook
  # Applies `@param` type coercion to preview parameters at render time.
  #
  # Coercion historically lived only in Lookbook's controller (`set_params`),
  # so entry paths that bypass it — notably ViewComponent's `render_preview`
  # test helper — received raw string params. This module is prepended to the
  # singleton class of each preview base class so coercion happens inside
  # `render_args`, which every entry path funnels through.
  #
  # Coercion is idempotent: only raw String values are cast, so values already
  # coerced upstream (e.g. by `set_params`) are passed through unchanged.
  module PreviewParamCoercion
    def render_args(scenario, params: {})
      super(scenario, params: PreviewParamCoercion.coerce(self, scenario, params))
    end

    def self.find_scenario(preview, scenario)
      name = scenario.to_s
      preview.scenarios.each do |entity|
        if entity.is_a?(ScenarioGroupEntity)
          found = entity.scenarios.find { |s| s.name == name }
          return found if found
        elsif entity.name == name
          return entity
        end
      end
      nil
    end

    def self.coerce(preview_class, scenario, params)
      return params if params.nil? || params.empty?

      preview = Engine.previews.find_by_preview_class(preview_class)
      return params unless preview

      scenario_entity = find_scenario(preview, scenario)
      return params unless scenario_entity

      param_tags = scenario_entity.tags("param").uniq(&:name)
      return params if param_tags.empty?

      coerced = params.dup
      param_tags.each do |tag|
        # Match the param key whether it was provided as a String or a Symbol,
        # preserving the original key type so the downstream `render_args`
        # slice (by symbol, or via indifferent access) still finds it.
        key = param_key(coerced, tag.name)
        next if key.nil?

        value = coerced[key]
        next unless value.is_a?(String) # idempotent: only cast raw strings

        begin
          coerced[key] = Param.from_tag(tag, value: value).cast_value
        rescue => exception
          Lookbook.logger.debug("Param coercion skipped for '#{tag.name}': #{exception.message}")
        end
      end
      coerced
    rescue => exception
      # Coercion must never raise out of `render_args`: fall back to the
      # original params if entity lookup or tag access fails unexpectedly.
      Lookbook.logger.debug("Param coercion skipped: #{exception.message}")
      params
    end

    def self.param_key(params, name)
      if params.key?(name)
        name
      elsif params.key?(name.to_sym)
        name.to_sym
      end
    end
  end
end
