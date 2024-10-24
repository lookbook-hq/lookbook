module Lookbook
  module PageHelper
    COMPONENT_HELPERS = %i[lb_table lb_icon lb_button lb_button_group markdown].freeze

    COMPONENT_HELPERS.each do |name|
      define_method name, AppHelper.instance_method(name)
    end

    include Lookbook::UrlHelper

    def embed(preview_class, scenario = nil, params: {}, actions: nil, panels: nil)
      tag_args = {
        preview: preview_class.name,
        scenario: scenario
      }

      tag_args[:panels] = Array(panels).join(",") if panels.present?
      tag_args[:actions] = Array(actions).join(",") if actions.present?

      params.each { |k, v| tag_args["param-#{k.to_s.dasherize}"] = v } if params.any?

      tag.lookbook_embed(**tag_args)
    end
  end
end
