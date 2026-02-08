module Lookbook
  class Collection < Lookbook::Object
    include Lookbook::Engine.routes.url_helpers
    include Configurable

    ALWAYS_WATCH_EXTENSIONS = [".rb", ".html.erb", ".erb", ".md"]

    prop :id, Symbol, :positional, reader: :public

    prop :path, Pathname do |value|
      Pathname(value.to_s) unless value.nil?
    end

    prop :watch_extensions, _Array(String), default: -> { [] }

    prop :label, _Nilable(String)
    prop :as, _Nilable(String)

    def path
      @path.absolute? ? @path : @path.expand_path(Collection.root_path)
    end

    def label
      @label || id.to_s.titleize
    end

    def url_path = lookbook_collection_path(self)

    def to_param
      @as || id.to_s.parameterize
    end

    def entities
      load!
      # @entities = if @entities
      #   Booklet.update(@entities)
      # else
      #   Booklet.analyze(path)
      # end
      # @dirty ? load! : @entities ||= load!
    end

    def specs = resources.grep(Spec)

    def pages = resources.grep(Page)

    delegate :warnings, :errors, :warnings?, :errors?, to: :entities

    def resources
      @resources ||= entities.accept(ResourceTreeBuilder.new)
    end

    def load!
      @resources = nil
      @entities = if @entities
        Booklet.update(@entities)
      else
        Booklet.analyze(path)
      end
    end

    # def dirty! = @dirty = true

    def watch_extensions
      (ALWAYS_WATCH_EXTENSIONS + @watch_extensions).uniq
    end

    def contains?(file)
      filepath = Pathname(file)
      filepath = filepath.absolute? ? filepath : filepath.expand_path(Collection.root_path)
      filepath.to_s.start_with?("#{path}/")
    end

    # def reloader
    #   @reloader ||= begin
    #     dirs = Hash[path.to_s, watch_extensions]
    #     Engine.file_watcher.new([], dirs) { load! }
    #   end
    # end

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

      def watch_dirs = map { [_1.path.to_s, _1.watch_extensions] }.to_h

      def resources = map { _1.resources.to_a }.flatten

      def specs = resources.grep(Spec)

      def pages = resources.grep(Page)

      def resources? = any? { _1.resources.any? }

      def root_path
        return @root_path if @root_path

        (defined?(Rails.root) && Rails.root.present?) ? Rails.root : Dir.pwd
      end

      attr_writer :root_path
    end
  end
end
