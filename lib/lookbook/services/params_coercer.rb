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
      @default_resolvers = {}
    end

    # Build a `Param` for each declared `@param` tag, reading its raw
    # (uncoerced) value from `params`. Used to render the params panel.
    #
    # @return [Array<Param>]
    def params_list(params)
      param_tags.map do |tag|
        build_param(tag, params[key_for(params, tag.name)])
      end
    end

    # Cast the declared param values in `params` in place.
    #
    # Keys that were not provided are left alone, as are values that are not
    # raw strings - which makes coercion idempotent, so a params object that
    # has already been cast upstream passes through unchanged. A scenario
    # default is only evaluated when the tag declares no type and it is
    # needed to infer one - and then at most once per coercer, however many
    # Params are built from the tag.
    #
    # @return [Hash, ActionController::Parameters] the supplied `params` object
    def cast!(params)
      param_tags.each do |tag|
        key = key_for(params, tag.name)
        next if key.nil?
        next unless params[key].is_a?(String)

        begin
          params[key] = build_param(tag, params[key]).cast_value
        rescue => exception
          # Warn rather than debug: a failure here usually means a malformed
          # `@param` tag or an uninferrable default, and the value silently
          # passing through uncoerced makes the resulting failure point
          # somewhere else entirely.
          Lookbook.logger.warn("Param coercion failed for '#{tag.name}' (value passed through uncoerced): #{exception.message}")
        end
      end
      params
    end

    # Non-mutating variant of {#cast!}, for callers that must not modify the
    # params object handed to them.
    #
    # @return [Hash, ActionController::Parameters] a coerced copy of `params`
    def cast(params)
      cast!(params.dup)
    end

    private

    def build_param(tag, value)
      Param.from_tag(tag, value: value, value_default_resolver: default_resolver(tag))
    end

    # One memoised resolver per tag, shared by every Param this coercer builds,
    # so UI construction, controller casting and repeated render_args casts
    # evaluate a dynamic default expression once rather than once each. On the
    # render path the coercer lives for the process, which is fine: there the
    # default is only ever consulted for type inference, never as a value.
    def default_resolver(tag)
      @default_resolvers[tag.name] ||= begin
        resolved = false
        value = nil
        lambda do
          unless resolved
            value = tag.value_default
            resolved = true
          end
          value
        end
      end
    end

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
