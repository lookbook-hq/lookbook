module Lookbook
  class Collection < Lookbook::Object
    include Loggable

    prop :id, Symbol, :positional, reader: :public, writer: false

    prop :path, Pathname, writer: false, reader: false do |value|
      Pathname(value.to_s) unless value.nil?
    end

    prop :label, _Nilable(String), writer: false, reader: false
    prop :as, _Nilable(String), writer: false, reader: false
    prop :options, Hash, writer: false, reader: :protected

    def path
      @path.absolute? ? @path : @path.expand_path(Collection.root_path)
    end

    def label
      @label ||= id.to_s.titleize
    end

    def entities
      Booklet.analyze(path).entities
    end

    def to_param
      @as ||= id.to_s.parameterize
    end

    # protected def root_node
    #   @root_node = begin
    #     dir = Directory.new(path:)
    #     raise "Collection path #{path} is not a directory" unless @root_node.directory?
    #     dir
    #   end
    # end

    class << self
      def find(param_value)
        all.find { _1.to_param == param_value.to_s }
      end

      def all
        @collections ||= Lookbook.config.collections.map do |key, config|
          from_config(key, config)
        end
      end

      def from_config(id, config)
        prop_names = literal_properties.map(&:name)
        new(id, options: config.except(*prop_names).freeze, **config.slice(*prop_names))
      end

      def root_path
        return @root_path if @root_path

        (defined?(Rails.root) && Rails.root.present?) ? Rails.root : Dir.pwd
      end

      attr_writer :root_path
    end
  end
end
