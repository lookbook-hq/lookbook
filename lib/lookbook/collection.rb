module Lookbook
  class Collection < Lookbook::Object
    include Lookbook::Engine.routes.url_helpers
    include Configurable

    prop :id, Symbol, :positional, reader: :public, writer: false

    prop :path, Pathname, writer: false, reader: false do |value|
      Pathname(value.to_s) unless value.nil?
    end

    prop :label, _Nilable(String), writer: false, reader: false
    prop :as, _Nilable(String), writer: false, reader: false

    def path
      @path.absolute? ? @path : @path.expand_path(Collection.root_path)
    end

    def label
      @label ||= id.to_s.titleize
    end

    def url_path = lookbook_collection_path(self)

    def to_param
      @as ||= id.to_s.parameterize
    end

    def resources
      entities.accept(ResourceTreeBuilder.new)
    end

    def nav_json
      nav_data = resources.accept(
        Booklet::HashConverter.new(props: {
          id: true,
          ref: false,
          label: true,
          icon: true,
          href: ->(node) { node.url_path },
          leaf: ->(node) { node.leaf? },
          hidden: ->(node) { node.hidden? },
          branch: ->(node) { node.branch? }
        })
      )
      JSON.generate(nav_data[:children])
    end

    delegate :warnings, :errors, :warnings?, :errors?, to: :entities

    def entities
      @entities ||= Booklet.analyze(path)
    end

    class << self
      def load_from_config
        @collections = config.collections.map do |id, config_opts|
          options = config_opts.to_h.slice(*literal_properties.map(&:name))
          new(id, **options)
        end
      end

      def all
        @collections ||= load_from_config
      end

      def find(id)
        all.find { _1.to_param.to_s == id.to_s }
      end

      def resources?
        all.any? { _1.resources.any? }
      end

      def root_path
        return @root_path if @root_path

        (defined?(Rails.root) && Rails.root.present?) ? Rails.root : Dir.pwd
      end

      attr_writer :root_path
    end
  end
end
