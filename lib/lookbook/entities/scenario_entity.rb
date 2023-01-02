module Lookbook
  # Represents a preview scenario method within a preview class
  #
  # @ignore methods
  # @api public
  class ScenarioEntity < Entity
    include InspectableEntity
    include AnnotatableEntity
    include NavigableEntity

    delegate :group, to: :code_object

    attr_reader :preview

    def initialize(code_object, preview, priority: nil)
      @code_object = code_object
      @preview = preview
      @default_priority = priority
      @lookup_path = "#{parent.lookup_path}/#{name}"
    end

    def id
      @_id ||= Utils.id(fetch_config(:id) { "#{parent.id}-#{code_object.name}" })
    end

    def name
      @_name ||= Utils.name(code_object.name)
    end

    def display_options
      parent.display_options.merge(fetch_config(:display_options, {}))
    end

    def targets
      @_targets ||= RenderTargetCollection.new(load_targets)
    end

    def target
      targets.first
    end

    def scenarios
      [self]
    end

    def template_source(template_path)
      source_path = template_file_path(template_path)
      source_path ? File.read(source_path) : nil
    end

    def template_lang(template_path)
      path = template_file_path(template_path)
      Lookbook::Lang.guess(path) || Lookbook::Lang.find(:html)
    end

    def search_terms
      [parent.label, label]
    end

    def url_path
      lookbook_inspect_path(path)
    end

    def type
      :scenario
    end

    alias_method :parent, :preview
    alias_method :lang, :source_lang
    alias_method :components, :targets
    alias_method :component, :target

    protected

    def sort_handler(other_entity)
      if Lookbook.config.sort_scenarios
        label <=> other_entity.label
      else
        [priority, label] <=> [other_entity.priority, other_entity.label]
      end
    end

    def format_source(source)
      source.sub(/^def \w+\s?(\([^)]+\))?/m, "").split("\n")[0..-2].join("\n")
    end

    def template_file_path(template_path)
      return full_template_path(template_path) if respond_to?(:full_template_path, true)

      search_dirs = [*Engine.preview_paths, *Engine.view_paths]
      template_path = "#{template_path.to_s.sub(/\..*$/, "")}.html.*"
      PathUtils.determine_full_path(template_path, search_dirs)
    end

    def load_targets
      target_identifiers = [*fetch_config(:targets, []), *preview.send(:fetch_config, :targets, [])]
      target_identifiers = preview.guess_targets if target_identifiers.empty?

      targets = target_identifiers.map { |target| ComponentEntity.new(target) }
      targets.uniq(&:path)
    end
  end
end
