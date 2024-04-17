module Lookbook
  module Inspector
    Previews.on_update { Inspector.clear_cache }

    class << self
      include Loggable

      def preview_targets(preview, names = nil, include_hidden: false)
        entities = (targets_cache[preview.id] ||= targets_for(preview)).deep_dup
        entities = include_hidden ? entities : entities.select(&:visible?)
        if names.is_a?(Array)
          names = names.map(&:to_sym)
          entities.select { _1.name.to_sym.in?(names) }
        else
          entities
        end
      end

      def nav_tree
        @nav_tree ||= begin
          debug("inspector: building nav tree")
          EntityTree.new([Previews.all, all_preview_targets].flatten)
        end
      end

      def preview_panels
        names = Lookbook.config.inspector_preview_panels.map(&:to_sym)
        panels.select { names.include?(_1.name) }
      end

      def drawer_panels
        names = Lookbook.config.inspector_drawer_panels.map(&:to_sym)
        panels.select { names.include?(_1.name) }
      end

      def embed_panels(names = nil)
        names ||= Lookbook.config.inspector_embed_panels
        names = names.map(&:to_sym)
        panels.select { names.include?(_1.name) }
      end

      def param_input(input_type)
        param_inputs.find { _1.name == input_type.to_sym } || param_input(:text)
      end

      def param_inputs
        @param_inputs ||= Lookbook.config.inspector_param_inputs.map do |name, opts|
          DataObject.new(
            name: Utils.name(name, true),
            partial: opts.partial,
            options: opts.except(:partial)
          )
        end
      end

      def clear_cache
        debug("inspector: clearing cache")

        @targets_cache = nil
        @nav_tree = nil
      end

      def panels
        @panels ||= Lookbook.config.inspector_panels.map do |name, opts|
          DataObject.new(
            name: Utils.name(name, true),
            label: Utils.label(opts.label || name),
            partial: opts.partial,
            options: opts.except(:label, :partial)
          )
        end
      end

      protected

      def all_preview_targets(include_hidden: false)
        Previews.all.map do |preview|
          if preview.visible? || include_hidden
            preview_targets(preview, include_hidden: include_hidden)
          end
        end.compact.flatten
      end

      def targets_cache
        @targets_cache ||= {}
      end

      def targets_for(preview)
        if preview.mailer_preview?
          preview.scenarios.map do |scenario|
            InspectorTargetEntity.new(scenario.name, preview, [scenario], default_priority: scenario.priority)
          end
        else
          targets = []
          preview.scenarios.each.with_index(1) do |scenario, i|
            if scenario.group.nil?
              targets << InspectorTargetEntity.new(scenario.name, preview, [scenario], default_priority: scenario.priority)
            else
              target_name = scenario.group.presence || preview.name.pluralize
              target = targets.find { _1.name == Utils.name(target_name) }

              if target
                target.scenarios << scenario
              else
                targets << InspectorTargetEntity.new(target_name, preview, [scenario], default_priority: i)
              end

              # Hidden so won't show in navigation but can still be accessed via it's URL
              targets << InspectorTargetEntity.new(scenario.name, preview, [scenario], hidden: true)
            end
          end
          targets
        end
      end
    end
  end
end
