module Lookbook
  # Casts raw preview param values to the types declared by their `@param` tags.
  #
  # Every entry path into a preview render - the Lookbook UI, embeds, and
  # ViewComponent's `render_preview` test helper - has to apply the same rule,
  # so it lives here rather than being restated at each call site.
  class ParamsCoercer
    # @api private
    attr_reader :param_tags

    def initialize(entity)
      @param_tags = entity ? entity.tags("param").uniq(&:name) : []
    end

    # Build a `Param` for each declared `@param` tag, reading its raw
    # (uncoerced) value from `params`.
    #
    # @return [Array<Param>]
    def params_list(params)
      param_tags.map do |tag|
        Param.from_tag(tag, value: params[key_for(params, tag.name)])
      end
    end

    # Cast the declared param values in `params` in place.
    #
    # Keys that were not provided are left alone, as are values that are not
    # raw strings - which makes coercion idempotent, so a params object that
    # has already been cast upstream passes through unchanged.
    #
    # @return [Array<Param>] the params built from the raw values
    def apply!(params)
      params_list(params).each do |param|
        key = key_for(params, param.name)
        next if key.nil?
        next unless params[key].is_a?(String)

        begin
          params[key] = param.cast_value
        rescue => exception
          # Warn rather than debug: a failure here usually means a malformed
          # `@param` tag, and the value silently passing through uncoerced makes
          # the resulting failure point somewhere else entirely.
          Lookbook.logger.warn("Param coercion failed for '#{param.name}' (value passed through uncoerced): #{exception.message}")
        end
      end
    end

    # Non-mutating variant of {#apply!}, for callers that must not modify the
    # params object handed to them.
    #
    # @return [Hash, ActionController::Parameters] a coerced copy of `params`
    def coerce(params)
      params.dup.tap { |copy| apply!(copy) }
    end

    private

    # Match a param whether it was provided under a String or a Symbol key, and
    # preserve whichever was used so the caller's own lookups still find it.
    def key_for(params, name)
      if params.key?(name)
        name
      elsif params.key?(name.to_sym)
        name.to_sym
      end
    end
  end
end
