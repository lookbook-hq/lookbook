module Lookbook
  class InspectableEntity < Entity
    include ActionView::Helpers::OutputSafetyHelper

    attr_reader :name, :scenarios

    def initialize(name, preview_entity, scenarios, default_priority: nil, hidden: false)
      @name = Utils.name(name)
      @preview_entity = preview_entity
      @scenarios = ScenarioCollection.new(scenarios)
      @default_priority = default_priority
      @hidden = hidden
      @source = nil
      @rendered_scenarios = {}
    end

    def id
      @id ||= Utils.id(name)
    end

    def uuid
      @uuid ||= Utils.hash(preview_entity.id, id)
    end

    alias_method :url_param, :name

    def lookup_path
      "#{preview_entity.lookup_path}/#{name}"
    end

    def source
      @source ||= scenarios.map(&:source).join("\n\n")
    end

    def render_scenarios
      scenarios.each do |scenario|
        @rendered_scenarios[scenario.name.to_sym] = yield(scenario)
      end
    end

    def scenarios_with_output
      scenarios.each do |scenario|
        yield(scenario, @rendered_scenarios[scenario.name.to_sym])
      end
    end

    def preview = preview_entity

    def self.icon = :eye

    protected

    attr_reader :preview_entity
  end
end
