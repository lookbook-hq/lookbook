# frozen_string_literal: true

require "active_support/dependencies/require_dependency"
require "view_component/preview"
require "lookbook/preview"

module Lookbook::Core
  class PreviewClassParser < Visitor
    visit SpecNode do |spec|
      if spec.format == :preview_class && !spec.errors?
        begin
          require_dependency spec.path
        rescue
          # noop
        end
      end

      if (spec.format != :preview_class) || spec.errors? || visited?(spec)
        return spec
      end

      begin
        class_object = Lookbook::Core.yard.parse_file(spec.path)
      rescue => error
        spec.add_error(error)
      end

      return spec unless class_object

      notes = class_object.docstring.strip_heredoc
      spec << TextNode.new(notes) if notes.present?

      tags = YARD::TagSet.new(class_object.tags)
      spec.node_data.tap do |data|
        data.yard_object = class_object
        data.yard_tags = tags
      end

      # Any @param and @display tags set at the class level
      # act as defaults for all scenario methods, unless overridden.
      default_tags = [*tags.param_tags, *tags.display_tags]

      scenarios = class_object
        .meths(inherited: false, included: false)
        .filter { _1.visibility == :public }
        .map { create_scenario(_1, default_tags) }

      spec.add_warning("No scenarios defined") if scenarios.none?
      spec.push(*scenarios)
      spec
    end

    private def create_scenario(method_object, default_tags = [])
      name = method_object.name
      preview_class_name = method_object.parent.path

      ScenarioNode.new(name:).tap do |scenario|
        scenario.group = method_object.group

        notes = method_object.docstring.strip_heredoc
        scenario << TextNode.new(notes) if notes.present?

        # TODO: handle sidecar-style ERB template way of defining previews
        scenario << CodeNode.new(
          CodeNode.extract_method_body(method_object.source),
          lang: method_object.source_type,
          location: [
            method_object.file,
            method_object.line + 1 # Add 1 to account for (stripped) method definition line
          ]
        )

        method_params = method_object.parameters.map { [_1.first.delete_suffix(":").to_sym, _1.last] }.to_h
        params = method_params.map do |name, raw_value|
          Param.new(name,
            required: raw_value.nil?,
            default_value: (preview_class_name.constantize.new.instance_eval(raw_value) unless raw_value.nil?))
        end

        scenario.params.push(params)

        scenario.node_data.tap do |data|
          data.yard_object = method_object
          data.yard_tags = YARD::TagSet.new([*default_tags, *method_object.tags])
        end
      end
    end
  end
end
