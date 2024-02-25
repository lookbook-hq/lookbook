module Lookbook
  class Preview
    include ActionView::Helpers::TagHelper
    include ActionView::Helpers::AssetTagHelper

    send(:include, Rails.application.routes.url_helpers) # YARD parsing workaround: https://github.com/lsegal/yard/issues/546

    def render(component = nil, **args, &block)
      if component.nil?
        {
          type: :view,
          template: args[:template] || Lookbook.config.preview_scenario_template,
          args: args,
          locals: args[:locals] || {},
          assigns: args[:assigns] || {},
          block: block
        }
      else
        {
          type: component.is_a?(String) ? :view : :component,
          args: args,
          block: block,
          component: component,
          locals: {},
          template: Lookbook.config.preview_scenario_template
        }
      end
    end

    def render_with_template(template: nil, locals: nil)
      {
        type: :template,
        template: template,
        locals: locals.to_h
      }
    end

    alias_method :render_component, :render

    class << self
      # rubocop:disable Style/TrivialAccessors
      def layout(layout_name)
        @layout = layout_name
      end
      # rubocop:enable Style/TrivialAccessors
    end
  end
end
