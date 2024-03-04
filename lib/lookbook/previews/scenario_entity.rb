module Lookbook
  class ScenarioEntity < Entity
    delegate_missing_to :code_object

    def initialize(code_object, preview_entity, default_priority: nil)
      @code_object = code_object
      @preview_entity = preview_entity
      @default_priority = default_priority
    end

    def id
      @id ||= Utils.id(code_object.name)
    end

    def uuid
      @uuid ||= Utils.hash(preview_entity.id, id)
    end

    def name
      @name ||= Utils.name(code_object.name)
    end

    alias_method :url_param, :name

    def lookup_path
      "#{preview_entity.lookup_path}/#{name}"
    end

    def source
      if custom_render_template?
        template_source(render_template_name)&.html_safe
      else
        src = CodeIndenter.call(code_object.source)
        ScenarioEntity.format_source(src)
      end
    end

    def render_args(params: {})
      method_params = code_object.parameters.map(&:first)
      provided_params = params.slice(*method_params).to_h.symbolize_keys
      result = call_method(**provided_params)
      result[:template] = template_path if result[:template].nil?
      result.merge(layout: preview_entity.layout)
    end

    # Returns the relative path (from preview_path) to the scenario template if the template exists
    def template_path
      scenario_name = code_object.name
      preview_name = preview_class.name.chomp("Preview").underscore
      preview_path =
        Previews.preview_paths.detect do |path|
          Dir["#{path}/#{preview_name}_preview/#{scenario_name}.html.*"].first
        end

      if preview_path.nil?
        raise Lookbook::Error,
          "A preview template for scenario #{scenario_name} doesn't exist.\n\n To fix this issue, create a template for the scenario."
      end

      path = Dir["#{preview_path}/#{preview_name}_preview/#{scenario_name}.html.*"].first
      Pathname.new(path)
        .relative_path_from(Pathname.new(preview_path))
        .to_s
        .sub(/\..*$/, "")
    end

    def template_source(template_path)
      source_path = template_file_path(template_path)
      source_path ? File.read(source_path) : nil
    end

    def template_file_path(template_path)
      return full_template_path(template_path) if respond_to?(:full_template_path, true)

      search_dirs = [*Previews.preview_paths, *Engine.view_paths]
      template_path = "#{template_path.to_s.sub(/\..*$/, "")}.html.*"
      Utils.determine_full_path(template_path, search_dirs)
    end

    def preview = preview_entity

    protected

    attr_reader :code_object, :preview_entity

    def preview_class
      preview_entity.preview_class
    end

    def call_method(**)
      preview_class.new.public_send(code_object.name, **) || {}
    end

    def render_template_name
      rargs[:template]
    end

    def custom_render_template?
      !render_template_name.in?(Previews.system_templates) && rargs[:type] != :view
    end

    def rargs
      @rargs ||= render_args
    end

    class << self
      def format_source(source)
        lines = source.sub(/^def \w+\s?(\([^)]+\))?/m, "").split("\n")[0..-2]
        (lines.many? ? lines.join("\n") : lines.first)&.html_safe
      end
    end
  end
end
