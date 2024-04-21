module Lookbook
  class PreviewEntity < Entity
    include EntityTreeNode

    attr_reader :preview_class, :preview_file_path, :preview_class_name, :preview_methods, :metadata

    delegate :notes, :notes?, to: :metadata

    def initialize(code_object, preview_class)
      @preview_class = preview_class
      @preview_file_path = Pathname(code_object.file)
      @preview_class_name = code_object.path
      @preview_methods = code_object.meths
      @metadata = PreviewMetadata.new(code_object)
    end

    def id
      @id ||= Utils.id(lookup_path)
    end

    def name
      @name ||= Utils.name(File.basename(lookup_path))
    end

    def label
      metadata.fetch(:label, super)
    end

    def hidden?
      return true if children.select(&:visible?).none?
      metadata.fetch(:hidden, super)
    end

    def priority
      metadata.fetch(:priority, super)
    end

    def url_param
      case Lookbook.config.preview_url_param.to_sym
      when :name
        name
      when :uuid
        uuid
      when :named_uuid
        "#{name}_#{uuid}"
      else
        name
      end
    end

    def lookup_path
      preview_class_name.underscore.downcase.gsub("_component", "").gsub("_preview", "")
    end

    def url_path
      show_preview_path(self)
    end

    def display_options
      DataObject.new(Inspector.default_display_options, metadata.display_options)
    end

    def layout
      if mailer_preview?
        "layouts/lookbook/mailer_preview"
      else
        preview_class.instance_variable_get(:@layout)
      end
    end

    def scenarios
      @scenarios ||= begin
        public_methods = preview_class.public_instance_methods(false)
        method_objects = preview_methods.select { |m| public_methods.include?(m.name) }
        scenarios = method_objects.map.with_index(1) do |code_object, i|
          ScenarioEntity.new(code_object, self, default_priority: i)
        end

        scenarios.sort!
      end
    end

    def inspector_targets
      @inspector_targets ||= if mailer_preview?
        scenarios.map do |scenario|
          InspectorTargetEntity.new(scenario.name, self, [scenario], default_priority: scenario.priority)
        end
      else
        targets = []
        scenarios.each.with_index(1) do |scenario, i|
          if scenario.group.nil?
            targets << InspectorTargetEntity.new(scenario.name, self, [scenario], default_priority: scenario.priority)
          else
            target_name = scenario.group.presence || name.pluralize
            target = targets.find { _1.name == Utils.name(target_name) }

            if target
              target.scenarios << scenario
            else
              targets << InspectorTargetEntity.new(target_name, self, [scenario], default_priority: i)
            end

            # Hidden so won't show in navigation but can still be accessed via it's URL
            targets << InspectorTargetEntity.new(scenario.name, self, [scenario], hidden: true)
          end
        end
        targets
      end
    end

    def mailer_preview?
      preview_class.ancestors.include?(::ActionMailer::Preview)
    end

    def preview_relative_file_path
      Pathname.new(preview_file_path).relative_path_from(Pathname.new(base_directory))
    end

    def preview_app_file_path
      Pathname.new(preview_file_path).relative_path_from(Rails.application.root)
    end

    def parent
      Previews.directories.find { _1.lookup_path == parent_lookup_path }
    end

    def children
      @children ||= inspector_targets.sort
    end

    private

    def base_directories
      Previews.preview_paths
    end

    def base_directory
      @base_directory ||= begin
        directories = Array(base_directories).map(&:to_s).sort_by { |path| path.split("/").size }.reverse
        directories.find { |dir| preview_file_path.to_s.start_with?(dir) }
      end
    end
  end
end
