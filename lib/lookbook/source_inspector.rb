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
      @hidden ||= !!tag_value(:hidden)
    end

    def id
      @id ||= tag_value(:id)
    end

    def label
      @label ||= tag_value(:label)
    end

    def notes
      @notes ||= code_object.docstring&.to_s&.strip
    end

    def group
      @group ||= code_object.group
    end

    def position
      @position ||= tag_value(:position, 10000)
    end

    def components
      @components ||= Array(code_object.tags(:component)).map(&:klass)
    end

    def display_options
      return @display_options unless @display_options.nil?
      pairs = Array(code_object.tags(:display)).map(&:parts)

      # dynamic params set at the entity level are
      # not (yet) supported so filter them out.
      pairs.select! { |pair| !pair[1].is_a?(Array) && !pair[1].is_a?(Hash) }

      pairs.to_h.symbolize_keys
    end

    def parameter_defaults
      @param_defaults ||= code_object.parameters.map { |str| Params.parse_method_param_str(str) }.compact.to_h
    end

    def params
      @params ||= {}
      @params[:param] ||= Array(code_object.tags("param")).map do |param|
        Lookbook::Params.build_param(param,
          default: parameter_defaults[param.name],
          eval_scope: @eval_scope)
      end
    end

    def methods
      @methods ||= code_object.meths
    end

    def tags(name = nil)
      tag_objects = Array(code_object.tags(name))
      Lookbook::Tags.process_tags(tag_objects,
        eval_scope: @eval_scope,
        file: (code_object.files.first[0] if code_object.files.any?))
    end

    def tag(name = nil)
      tags(name).first
    end

    protected

    def tag_value(tag_name, fallback = nil)
      code_object&.tag(tag_name)&.value || fallback
    end
  end
end
