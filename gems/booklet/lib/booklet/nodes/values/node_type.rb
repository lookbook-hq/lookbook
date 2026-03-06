# frozen_string_literal: true

module Booklet
  class NodeType < Booklet::Data
    prop :type, _Class(Node), :positional, reader: :public do |value|
      if value.is_a?(String) || value.is_a?(Symbol)
        value = "#{value}_node" unless value.downcase == "node"
        "Booklet::#{value.classify}".constantize
      else
        value
      end
    end

    def name
      @type.name.to_s.demodulize.underscore.delete_suffix("_node")
    end

    alias_method :value, :type
    alias_method :to_s, :name

    delegate :to_sym, to: :name
    delegate :pluralize, to: :name

    def enquirer
      ActiveSupport::StringInquirer.new(name)
    end

    def method_missing(name, ...)
      name.end_with?("?") ? enquirer.public_send(name) : super
    end

    def respond_to_missing?(name, ...)
      name.end_with?("?") || super
    end

    def ==(other)
      case other
      when NodeType
        type == other.type
      when Class
        type == other
      else
        name == other.to_s
      end
    end
  end
end
