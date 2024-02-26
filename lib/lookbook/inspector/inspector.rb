module Lookbook
  module Inspector
    Previews.on_update { Inspector.clear_cache }

    class << self
      include Loggable

      def preview_targets(preview, include_hidden: false)
        entities = (targets_cache[preview.id] ||= targets_for(preview)).deep_dup
        include_hidden ? entities : entities.select(&:visible?)
      end

      def nav_tree
        @nav_tree ||= begin
          debug("inspector: building nav tree")
          InspectorNavTree.new(Previews.all, all_preview_targets)
        end
      end

      def source_template
        Lookbook.config.inspector_source_template
      end

      def output_template
        Lookbook.config.inspector_output_template
      end

      def notes_template
        Lookbook.config.inspector_notes_template
      end

      def preview_template
        Lookbook.config.inspector_preview_template
      end

      def clear_cache
        debug("inspector: clearing cache")

        @targets_cache = nil
        @nav_tree = nil
      end

      protected

      def all_preview_targets(include_hidden: false)
        Previews.all.map { preview_targets(_1, include_hidden: include_hidden) }.flatten
      end

      def targets_cache
        @targets_cache ||= {}
      end

      def targets_for(preview)
        targets = []
        preview.scenarios.each.with_index(1) do |scenario, i|
          if scenario.group.nil?
            targets << InspectorTargetEntity.new(scenario.name, preview, [scenario], default_priority: i)
          else
            target_name = scenario.group.presence || preview.name.pluralize
            target = targets.find { _1.name == Utils.name(target_name) }

            if target
              target.scenarios << scenario
            else
              targets << InspectorTargetEntity.new(target_name, preview, [scenario], default_priority: i)
            end

            targets << InspectorTargetEntity.new(scenario.name, preview, [scenario], hidden: true)
          end
        end
        targets
      end
    end
  end
end
