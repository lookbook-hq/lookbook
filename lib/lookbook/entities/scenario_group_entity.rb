module Lookbook
  # Represents a group of preview scenarios within a preview class
  #
  # @ignore methods
  # @api public
  class ScenarioGroupEntity < Entity
    include NavigableEntity

    attr_reader :scenarios, :preview

    def initialize(name, scenarios, preview)
      @name = Utils.name(name)
      @scenarios = PreviewExampleCollection.new(scenarios)
      @preview = preview
      @lookup_path = "#{parent.lookup_path}/#{@name}"
    end

    def display_options
      merged = {}
      scenarios.to_a.reverse.map do |scenario|
        merged.merge!(scenario.display_options)
      end
      merged
    end

    def components
      @_components ||= ComponentCollection.new(scenarios.flat_map(&:components).uniq(&:path))
    end

    def search_terms
      [parent.label, label]
    end

    def tags(tag_name = nil)
      scenarios.flat_map { |scenario| scenario.tags(tag_name) }
    end

    def tag(tag_name = nil)
      tags(tag_name).first
    end

    def url_path
      lookbook_inspect_path(path)
    end

    def render_type
      scenarios.flat_map(&:render_type).uniq.first
    end

    def type
      :group
    end

    alias_method :parent, :preview
  end
end
