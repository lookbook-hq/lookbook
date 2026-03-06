# frozen_string_literal: true

module Booklet
  class HashConverter < Visitor
    prop :props, _Union(_Array(Symbol), _Hash(Symbol, _Union(Proc, _Boolean))), default: {}.freeze

    visit do |node|
      if node.root?
        memo = @hash = @current = node_to_hash(node)
      else
        hash = node_to_hash(node)
        @current[:children].push(hash)

        memo = @current
        @current = hash
      end

      visit_each(node.children)

      @current = memo
      @hash
    end

    protected def node_to_hash(node)
      hash = included_props.map do |p, resolver|
        if resolver.is_a?(Proc)
          [p, resolver.call(node)]
        elsif resolver != false && node.respond_to?(p)
          [p, node.public_send(p)]
        end
      end.compact.to_h

      hash[:children] = []
      hash
    end

    protected def included_props
      @included_props ||= begin
        props = @props.presence || {}

        if props.is_a?(Array)
          props = props.map { [_1, true] }.to_h
        end

        props.with_defaults(
          ref: ->(node) { node.ref },
          type: ->(node) { node.type.name }
        )
      end
    end
  end
end
