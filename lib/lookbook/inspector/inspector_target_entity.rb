module Lookbook
  class InspectorTargetEntity < Entity
    include ActionView::Helpers::OutputSafetyHelper

    attr_reader :name, :scenarios

    def initialize(name, preview_entity, scenarios, default_priority: nil, hidden: nil)
      @name = Utils.name(name)
      @preview_entity = preview_entity
      @scenarios = scenarios
      @default_priority = default_priority
      @hidden = hidden
      @rendered_scenarios = {}
    end

    def id
      @id ||= Utils.id(name)
    end

    def uuid
      @uuid ||= Utils.hash(preview_entity.id, id)
    end

    def url_path
      inspect_target_path(preview_entity, self)
    end

    def label
      (scenarios.size == 1) ? scenarios.first.label : super
    end

    def hidden?
      return true if @hidden

      (scenarios.size == 1) ? scenarios.first.hidden? : super
    end

    def preview_path
      preview_target_path(preview_entity, self)
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

    def scenarios_with_output
      if block_given?
        scenarios.each do |scenario|
          yield(scenario, @rendered_scenarios[scenario.name.to_sym])
        end
      else
        scenarios
      end
    end

    def scenarios_with_notes
      if block_given?
        scenarios.each do |scenario|
          yield(scenario, scenario.notes) if scenario.notes?
        end
      else
        scenarios.select { _1.notes? }
      end
    end

    def source_language
      scenarios.first&.source_language
    end

    def notes?
      scenarios.find { _1.notes? }
    end

    def preview = preview_entity

    protected

    attr_reader :preview_entity
  end
end
