module Lookbook
  class PreviewEntity < Entity
    attr_reader :preview_class

    def initialize(code_object, preview_class)
      @code_object = code_object
      @preview_class = preview_class
    end

    def id
      @id ||= Utils.id(lookup_path)
    end

    def name
      @name ||= Utils.name(File.basename(lookup_path))
    end

    def url_param
      @url_param ||= lookup_path.tr("/", ":")
    end

    def scenarios
      @scenarios ||= scenario_entities
    end

    def inspector_targets
      inspectable_entities
    end

    def lookup_path
      preview_class_name.underscore.downcase.gsub("_component", "").gsub("_preview", "")
    end

    def layout
      preview_class.instance_variable_get(:@layout)
    end

    def scenario_group_names
      @scenario_group_names ||= scenarios.map(&:group).uniq.compact.map(&:to_sym)
    end

    def lookup_directory_path
      @lookup_directory_path ||= File.dirname(lookup_path).delete_prefix(".")
    end

    def self.icon = :layers

    protected

    def inspectable_entities
      entities = []
      scenarios.each.with_index(1) do |scenario, i|
        preview = scenario.preview

        if scenario.group.nil?
          entities << InspectableEntity.new(scenario.name, preview, [scenario], default_priority: i)
        else
          target_name = scenario.group.presence || scenario.preview.name.pluralize
          target = entities.find { _1.name == Utils.name(target_name) }

          if target
            target.scenarios << scenario
          else
            entities << InspectableEntity.new(target_name, preview, [scenario], default_priority: i)
          end

          entities << InspectableEntity.new(scenario.name, preview, [scenario], hidden: true)
        end
      end

      entities
    end

    def scenario_entities
      public_methods = preview_class.public_instance_methods(false)
      method_objects = code_object.meths.select { |m| public_methods.include?(m.name) }
      method_objects.map.with_index do |code_object, i|
        ScenarioEntity.new(code_object, self, default_priority: i)
      end
    end

    def preview_file_path = Pathname(code_object.file)

    def preview_class_name = code_object.path

    attr_reader :code_object
  end
end
