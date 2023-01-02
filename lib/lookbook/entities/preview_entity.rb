module Lookbook
  # Represents a preview class
  #
  # @ignore methods
  # @api public
  class PreviewEntity < Entity
    include AnnotatableEntity
    include LocatableEntity
    include NavigableEntity

    delegate :render_args, to: :preview_class

    attr_reader :preview_class

    def initialize(code_object)
      @code_object = code_object
      @preview_class = code_object.path.constantize
      @file_path = Pathname(code_object.file)
      @base_directories = Engine.preview_paths

      cleaned_path = relative_file_path.to_s
        .gsub(/\/(component_preview|preview)(\..*)$/, "")
        .gsub(/(_component_preview|_preview)(\..*)$/, "")

      @lookup_path = PathUtils.to_lookup_path(cleaned_path)
    end

    def scenarios
      @_scenarios ||= PreviewExampleCollection.new(load_scenarios)
    end

    def scenario(scenario_name)
      scenarios.find { |m| m.name == scenario_name.to_s }
    end

    def visible_scenarios
      @_visible_scenarios ||= PreviewExampleCollection.new(scenarios.select(&:visible?))
    end

    def default_scenario
      visible_scenarios.first
    end

    def components
      @_components ||= ComponentCollection.new(scenarios.flat_map(&:components).uniq(&:path))
    end

    def component
      components.first
    end

    def display_options
      global_options = Lookbook.config.preview_display_options
      global_options.deep_merge(fetch_config(:display_options, {}))
    end

    def layout
      preview_class.instance_variable_get(:@layout)
    end

    def url_path
      lookbook_inspect_path(path)
    end

    def preview_class_name
      preview_class.name
    end

    def render_type
      fetch_config(:type) { Lookbook.config.preview_type_default.to_sym }
    end

    def guess_components
      [preview_class.name.chomp("Preview").constantize]
    rescue
      []
    end

    protected

    def load_scenarios
      return scenario_entities unless code_object.groups.any?

      scenario_entities.group_by(&:group).flat_map do |group_name, grouped_scenarios|
        group_name.nil? ? grouped_scenarios : ScenarioGroupEntity.new(group_name.presence || label.pluralize, grouped_scenarios, self)
      end
    end

    def scenario_entities
      public_methods = preview_class.public_instance_methods(false)
      method_objects = code_object.meths.select { |m| public_methods.include?(m.name) }
      method_objects.map.with_index { |code_object, i| ScenarioEntity.new(code_object, self, priority: i) }
    end
  end
end
