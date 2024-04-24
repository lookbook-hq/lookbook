module Lookbook
  module PreviewActions
    extend ActiveSupport::Concern

    private

    def assign_preview
      @preview = Previews.all.find { _1.url_param == params[:preview] }
      raise ActionController::RoutingError, "Could not find preview '#{params[:preview]}'" unless @preview
    end

    def assign_target
      @target = @preview.inspector_targets.find { _1.url_param == params[:target] }
      raise ActionController::RoutingError, "Could not find target '#{params[:target]}' for preview '#{params[:preview]}'" unless @target
    end

    def assign_scenario
      @scenario = @preview.scenarios.find { _1.url_param == params[:scenario] }
      raise ActionController::RoutingError, "Could not find scenario '#{params[:scenario]}' for preview '#{params[:preview]}'" unless @scenario
    end

    def assign_display_options
      @display_options = DataObject.new(
        dynamic_display_options_defaults
          .merge(cookie_display_options)
          .merge(@target.display_options)
          .merge(url_display_options)
      )
    end

    def persist_display_options
      options = @display_options.select do |key|
        dynamic_display_option?(key) && !@target.display_options.key?(key)
      end
      cookies["lookbook-display-options"] = SearchParamEncoder.call(cookie_display_options.merge(options))
    end

    def cookie_display_options
      options_str = cookies.fetch("lookbook-display-options", "{}")
      SearchParamParser.call(options_str).select { dynamic_display_option?(_1) }
    end

    def url_display_options
      SearchParamParser.call(params[:_display].presence || "{}")
        .select { dynamic_display_option?(_1) }
    end

    def dynamic_display_options_defaults
      Inspector.dynamic_display_options.transform_values(&:default_value)
    end

    def dynamic_display_option?(name)
      Inspector.dynamic_display_options.key?(name)
    end
  end
end
