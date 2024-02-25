module Lookbook
  class InspectableCollection < EntityCollection
    def inspectables = @entities

    def visible
      InspectableCollection.new(@entities.select(&:visible?))
    end

    class << self
      def from_scenarios(scenarios)
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

        new(entities)
      end
    end
  end
end
