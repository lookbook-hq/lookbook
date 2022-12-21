module Lookbook
  # Base entity class
  #
  # @api private
  class Entity
    include Comparable
    send(:include, Lookbook::Engine.routes.url_helpers) # YARD parsing workaround: https://github.com/lsegal/yard/issues/546

    def initialize(lookup_path = nil)
      @lookup_path = lookup_path
    end

    def id
      Utils.id(fetch_config(:id) { lookup_path.tr("/", "-") })
    end

    def name
      @_name ||= Utils.name(File.basename(@lookup_path))
    end

    def label
      @_label ||= fetch_config(:label) { name.titleize }
    end

    def lookup_path
      return @_lookup_path if @_lookup_path

      directory = fetch_config(:logical_path) do
        dir = File.dirname(@lookup_path)
        dir if !dir.start_with?(".")
      end
      @_lookup_path ||= PathUtils.strip_slashes(PathUtils.to_path(directory, name))
    end

    def url_path
      nil
    end

    def type
      @_type ||= self.class.name.gsub("Entity", "").demodulize.underscore.downcase.to_sym
    end

    def <=>(other)
      label <=> other.label
    end

    alias_method :path, :lookup_path
    alias_method :logical_path, :lookup_path

    protected

    def fetch_config(key, fallback = nil, &block)
      Utils.value_or_fallback(nil, fallback, &block)
    end
  end
end
