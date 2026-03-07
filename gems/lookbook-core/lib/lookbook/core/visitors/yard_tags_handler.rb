# frozen_string_literal: true

module Lookbook::Core
  class YardTagsHandler < Visitor
    visit SpecNode do |spec|
      return spec if !spec.node_data.yard_tags || spec.errors? || visited?(spec)

      apply_tags(spec, spec.node_data.yard_object)
      visit_each(spec.scenarios)
      spec
    end

    visit ScenarioNode do |scenario|
      return scenario if !scenario.node_data.yard_tags || scenario.errors? || visited?(scenario)

      apply_tags(scenario, scenario.spec.node_data.yard_object)
    end

    private def apply_tags(node, yard_object)
      preview_class_name = yard_object.path
      tags = node.node_data.yard_tags

      node.tap do |n|
        node.label = tags.label_tag.value if tags.label_tag
        node.hidden = tags.hidden_tag.value if tags.hidden_tag

        tags.display_tags.each do |tag|
          node.display_options = node.display_options.merge(tag.value)
        end

        tags.param_tags.each do |tag|
          param_data = tag.value
          param_data[:explicit] = true
          if tag.options?
            param_data[:options] = proc do
              preview_class = preview_class_name.constantize.new
              tag.resolve_options(preview_class)
            end
          end

          node.params.update(tag.name, param_data)
        end

        tags.other_tags.each do |tag|
          node.try("#{tag.tag_name}=", tag.value)
        end
      end
    end
  end
end
