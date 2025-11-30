module Lookbook
  module WithDisplayOptions
    extend ActiveSupport::Concern

    included do
      # TODO: Replace with display option handling from v3 branch
      def assign_display_options
        @dynamic_display_options = []
        @static_display_options = []

        if @scenario.present?
          opts = @scenario.display_options
          @dynamic_display_options = opts.select { _2.is_a?(Array) || _2.is_a?(Hash) }
          @static_display_options = opts.except(*@dynamic_display_options.keys)

          if params[:_display]
            display_params = SearchParamParser.call(params[:_display])
            display_params.each do |name, value|
              if @dynamic_display_options.key?(name)
                cookies["lookbook-display-#{name}"] = value.is_a?(Array) ? value[1] : value
              end
            end
          end

          @dynamic_display_options.each do |name, opts|
            choices = opts.is_a?(Hash) ? opts[:choices].to_a : opts
            value = choices.first.is_a?(Array) ? choices.first[1] : choices.first
            @static_display_options[name] ||= cookies.fetch("lookbook-display-#{name}", value)
          end

          unless params[:_display]
            display_params = @dynamic_display_options.each_with_object({}) do |(name, opts), hash|
              hash[name] = @static_display_options[name]
            end
            request.query_parameters[:_display] = SearchParamEncoder.call(display_params)
          end
        end
      end
    end
  end
end
