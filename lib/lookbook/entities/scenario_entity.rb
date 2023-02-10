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

    def render_targets
      @_render_targets ||= RenderTargetCollection.new(load_render_targets)
    end

    def render_target
      render_targets.first
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
      lookbook_inspect_path(lookup_path)
    end

    def preview_path
      lookbook_preview_path(lookup_path)
    end

    def type
      :scenario
    end

    alias_method :parent, :preview
    alias_method :components, :render_targets
    alias_method :component, :render_target
    alias_method :lang, :source_lang
    alias_method :examples, :scenarios

    deprecate lang: :source_lang, deprecator: Deprecation
    deprecate examples: :scenarios, deprecator: Deprecation

    protected

    def sort_handler(other_entity)
      if Lookbook.config.preview_sort_scenarios
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

    def load_render_targets
      render_target_identifiers = [*fetch_config(:renders, []), *preview.send(:fetch_config, :renders, [])]
      render_target_identifiers = preview.guess_render_targets if render_target_identifiers.empty?

      render_targets = render_target_identifiers.map do |render_target|
        RenderableEntity.new(render_target)
      rescue NameError
        Lookbook.logger.warn "#{render_target} was not found"
        nil
      end
      render_targets.compact.uniq(&:lookup_path)
    end
  end
end
