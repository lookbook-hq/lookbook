module Lookbook
  class SourceInspector
    include Utils

    attr_reader :code_object
    delegate :groups, :source, to: :@code_object, allow_nil: true

    def initialize(code_object, eval_scope: nil)
      @code_object = code_object
      @eval_scope = eval_scope
    end

    def hidden?
      @hidden ||= if code_object&.tag(:hidden)
        code_object.tag(:hidden).text.strip != "false"
      else
        false
      end
    end

    def id
      @id ||= if code_object&.tag(:id)&.text&.present?
        generate_id(code_object&.tag(:id)&.text)
      end
    end

    def label
      @label ||= code_object&.tag(:label)&.text
    end

    def notes
      @notes ||= if code_object&.docstring
        code_object.docstring.to_s.strip
      end
    end

    def group
      @group ||= code_object&.group
    end

    def position
      @position ||= code_object&.tag(:position)&.text&.to_i || 10000
    end

    def components
      @components ||= if code_object&.tags(:component).present?
        code_object.tags(:component).map do |component|
          component.text.constantize
        end
      else
        []
      end
    end

    def display_options
      return @display_options unless @display_options.nil?
      @display_options = code_object.tags(:display).to_a.map do |tag|
        KeyValueTagParser.call(tag.text)
      end.to_h.with_indifferent_access
    end

    def parameter_defaults
      @param_defaults ||= code_object&.parameters&.map { |str| Params.parse_method_param_str(str) }&.compact&.to_h
    end

    def params
      @params ||= {}
      @params[:param] ||= code_object&.tags("param")&.map do |param|
        Lookbook::Params.build_param(param,
          default: parameter_defaults[param.name],
          eval_scope: @eval_scope)
      end
    end

    def methods
      @methods ||= code_object&.meths
    end

    def tags(name = nil)
      tag_objects = code_object&.tags(name).presence || []
      Lookbook::Tags.process_tags(tag_objects,
        eval_scope: @eval_scope,
        file: (code_object.files.first[0] if code_object.files.any?))
    end

    def tag(name = nil)
      tags(name).first
    end
  end
end
