module Lookbook
  class Preview
    include ActionView::Helpers::TagHelper
    include ActionView::Helpers::AssetTagHelper

    def render(component, **args, &block)
      {
        type: component.is_a?(String) ? :view : :component,
        args: args,
        block: block,
        component: component,
        locals: {},
        template: Lookbook.config.preview_template
      }
    end

    def render_with_template(template: nil, locals: {})
      {
        template: template,
        locals: locals
      }
    end

    alias_method :render_component, :render

    class << self
      # Returns the arguments for rendering of the component in its layout
      def render_args(scenario, params: {})
        scenario_params_names = instance_method(scenario).parameters.map(&:last)
        provided_params = params.slice(*scenario_params_names).to_h.symbolize_keys
        result = provided_params.empty? ? new.public_send(scenario) : new.public_send(scenario, **provided_params)
        result ||= {}
        result[:template] = preview_scenario_template_path(scenario) if result[:template].nil?
        @layout = nil unless defined?(@layout)
        result.merge(layout: @layout)
      end

      # rubocop:disable Style/TrivialAccessors
      def layout(layout_name)
        @layout = layout_name
      end
      # rubocop:enable Style/TrivialAccessors

      # Returns the relative path (from preview_path) to the preview scenario template if the template exists
      def preview_scenario_template_path(scenario)
        preview_name = name.chomp("Preview").underscore
        preview_path =
          Engine.preview_paths.detect do |path|
            Dir["#{path}/#{preview_name}_preview/#{scenario}.html.*"].first
          end

        if preview_path.nil?
          raise(
            PreviewTemplateError,
            "A preview template for scenario #{scenario} doesn't exist.\n\n" \
            "To fix this issue, create a template for the scenario."
          )
        end

        path = Dir["#{preview_path}/#{preview_name}_preview/#{scenario}.html.*"].first
        Pathname.new(path)
          .relative_path_from(Pathname.new(preview_path))
          .to_s
          .sub(/\..*$/, "")
      end
    end
  end
end
