module Lookbook
  # Represents a preview example method within a preview class
  #
  # @ignore methods
  # @api public
  class PreviewExampleEntity < Entity
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

    def components
      @_components ||= ComponentCollection.new(load_components)
    end

    def component
      components.first
    end

    def examples
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

    def render_type
      fetch_config(:type) { preview.render_type }
    end

    def type
      :example
    end

    alias_method :parent, :preview
    alias_method :lang, :source_lang

    protected

    def sort_handler(other_entity)
      if Lookbook.config.sort_examples
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
      template_path = template_path.to_s.sub(/\..*$/, "")
      base_path = search_dirs.detect do |p|
        Dir["#{p}/#{template_path}.html.*"].first
      end
      path = Dir["#{base_path}/#{template_path}.html.*"].first
      Pathname(path) if path
    end

    def load_components
      component_classes = [*fetch_config(:components, []), *preview.send(:fetch_config, :components, [])]
      component_classes = preview.guess_components if component_classes.empty?

      components = component_classes.map { |klass| ComponentEntity.new(klass) }
      components.uniq(&:path)
    end
  end
end
