module Lookbook
  class Collection < Lookbook::Object
    include Lookbook::Engine.routes.url_helpers
    include InertiaSerializable
    include Configurable

    ALWAYS_WATCH_EXTENSIONS = [".rb", ".html.erb", ".erb", ".md"]

    prop :id, Symbol, :positional, reader: :public

    prop :path, Pathname do |value|
      Pathname(value.to_s) unless value.nil?
    end

    prop :watch_extensions, _Array(String), default: -> { [] }

    prop :label, _Nilable(String)
    prop :as, _Nilable(String)

    inertia_props [:id, :to_param], :label, :href, [:issues, :issues_data], [:nav, :resources]

    def path
      @path.absolute? ? @path : @path.expand_path(Collection.root_path)
    end

    def label
      @label || id.to_s.titleize
    end

    def url_path = collection_path(self)
    alias_method :href, :url_path

    def to_param
      @as || id.to_s.parameterize
    end

    def entities = load! # TODO: memoize entity tree?

    def specs = resources.grep(Spec)

    def pages = resources.grep(Page)

    def resources
      @resources ||= entities.accept(ResourceTreeBuilder.new)
    end

    delegate :issues, :warnings, :errors, :issue?, :warnings?, :errors?, to: :entities

    def contains?(file)
      filepath = Pathname(file)
      filepath = filepath.absolute? ? filepath : filepath.expand_path(Collection.root_path)
      filepath.to_s.start_with?("#{path}/")
    end

    def reloader
      @reloader ||= begin
        watch_dir = Hash[path.to_s, watch_extensions] # rubocop:disable Style/HashConversion
        FileWatcher.new(watch_dir) do
          debug("#{id} collection: files changed, starting update")
          load!
          debug("#{id} collection: update complete")
        end
      end
    end

    protected def load!
      @resources = nil
      @entities = if @entities
        Booklet.update(@entities)
      else
        Booklet.analyze(path)
      end
    end

    protected def watch_extensions
      (ALWAYS_WATCH_EXTENSIONS + @watch_extensions).uniq
    end

    def issues_data
      issues.to_a.map do |issue|
        {
          message: issue.message,
          file: issue&.node&.path
        }
      end
    end

    class << self
      include Enumerable

      delegate :each, to: :all

      def load_from_config
        @collections = config.collections.map do |id, config_opts|
          options = config_opts.to_h.slice(*literal_properties.map(&:name))
          new(id, **options)
        end
      end

      def all = @collections ||= load_from_config

      def find(id = nil, &block)
        return super if block
        all.find { _1.to_param.to_s == id.to_s }
      end

      def resources = map { _1.resources.to_a }.flatten

      def specs = resources.grep(Spec)

      def scenarios = resources.grep(Scenario)

      def pages = resources.grep(Page)

      def resources? = any? { _1.resources.any? }

      def root_path
        @root_path ||= defined?(Rails.root && Rails.root.present?) ? Rails.root : Dir.pwd
      end

      attr_writer :root_path
    end
  end
end
