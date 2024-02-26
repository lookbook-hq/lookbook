module Lookbook
  class InspectorTargetEntity < Entity
    include ActionView::Helpers::OutputSafetyHelper

    attr_reader :name, :scenarios

    def initialize(name, preview_entity, scenarios, default_priority: nil, hidden: false)
      @name = Utils.name(name)
      @preview_entity = preview_entity
      @scenarios = scenarios
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

    def inspect_path
      inspector_path(preview_entity, self)
    end

    def preview_path
      inspector_preview_path(preview_entity, self)
    end

    alias_method :url_param, :name

    def lookup_path
      "#{preview_entity.lookup_path}/#{name}"
    end

    def render_scenarios
      scenarios.each do |scenario|
        @rendered_scenarios[scenario.name.to_sym] = yield(scenario)
      end
    end

    def each_scenario_with_output
      scenarios.each do |scenario|
        yield(scenario, @rendered_scenarios[scenario.name.to_sym])
      end
    end

    def lookup_directory_path
      nil
    end

    def preview = preview_entity

    protected

    attr_reader :preview_entity
  end
end
