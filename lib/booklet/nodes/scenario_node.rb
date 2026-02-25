module Booklet
  class ScenarioNode < Node
    include Nameable
    include Hideable
    include AcceptsParams
    include AcceptsDisplayOptions

    prop :group, _Nilable(String), reader: :public, writer: :public
    prop :view_context, _Nilable(Object), writer: :public, reader: :public

    permit_child_nodes TextNode, CodeNode

    def notes = children.grep(TextNode)&.first

    def source = children.grep(CodeNode)&.first

    def display_options = Options.new(@display_options)

    alias_method :spec, :parent

    alias_method :ref, :name

    def call(view_context = self.view_context, **locals)
      raise "Cannot render a scenario without a view context" unless view_context

      locals = resolve_params(locals)
      render_in_view_context(view_context, locals)
    end

    private def render_in_view_context(view_context, locals = {})
      if source.lang == :ruby
        view_context.define_singleton_method(:method_missing) do |name, *args|
          locals.key?(name) ? locals[name] : super
        end
        view_context.instance_eval(source)
      else
        view_context.render(inline: source, locals:)
      end
    end

    private def resolve_params(params)
      case params
      when ParamSet
        params.to_values_hash
      when Hash
        self.params.to_values_hash(params)
      else
        {}
      end
    end
  end
end
