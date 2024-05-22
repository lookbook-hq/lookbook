module Lookbook
  class PreviewEntity < Entity
    include EntityTreeNode

    attr_reader :preview_class, :preview_class_name, :preview_methods, :file_path, :metadata

    delegate :notes, :notes?, to: :metadata

    def initialize(code_object, preview_class)
      @preview_class = preview_class
      @preview_class_name = code_object.path
      @preview_methods = code_object.meths
      @file_path = Pathname(code_object.file)
      @metadata = PreviewMetadata.new(code_object)
    end

    def id
      @id ||= Utils.id(metadata.fetch(:id, lookup_path))
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
      preview_page_path(self)
    end

    def relative_file_path
      Pathname.new(file_path).relative_path_from(Pathname.new(base_directory))
    end

    def readme_path
      if default_readme_path.present? && File.exist?(default_readme_path)
        default_readme_path
      end
    end

    def readme_page
      unless readme_path.nil?
        PreviewPageEntity.new(
          readme_path,
          File.read(readme_path),
          url_path: url_path,
          lookup_path: lookup_path,
          options: {
            label: label,
            title: title
          }
        )
      end
    end

    def display_options
      DataObject.new(Inspector.display_options_defaults, metadata.display_options)
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

    def resolve_target(identifier)
      return identifier if identifier.is_a?(InspectorTargetEntity)

      if identifier.is_a?(String) || identifier.is_a?(Symbol)
        inspector_targets.find { [_1.id, _1.uuid].include?(identifier.to_s) }
      else
        raise ArgumentError, "Invalid preview target identifier"
      end
    end

    def mailer_preview?
      preview_class.ancestors.include?(::ActionMailer::Preview)
    end

    def parent
      Previews.directories.find { _1.lookup_path == parent_lookup_path }
    end

    def children
      @children ||= inspector_targets.sort
    end

    def to_h
      {
        id: id,
        uuid: uuid,
        name: name,
        label: label,
        lookup_path: lookup_path,
        url_path: url_path,
        file_path: file_path,
        scenarios: scenarios.map(&:to_h)
      }
    end

    private

    def default_readme_path
      preview_base_path = file_path.to_s.delete_suffix("_preview.rb")
      page_extensions_glob = "{#{Lookbook.config.page_extensions.join(",")}}"
      readme_path = Dir["#{preview_base_path}*.#{page_extensions_glob}"].first
      Pathname(readme_path) if readme_path
    end

    def base_directory
      @base_directory ||= begin
        directories = Previews.preview_paths.map(&:to_s).sort_by { |path| path.split("/").size }.reverse
        directories.find { |dir| file_path.to_s.start_with?(dir) }
      end
    end
  end
end
