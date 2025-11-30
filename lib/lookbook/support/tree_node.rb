module Lookbook
  class TreeNode
    include Enumerable
    include Comparable

    delegate :to_json, to: :as_json
    delegate_missing_to :content, allow_nil: true

    attr_accessor :path, :content
    attr_reader :children

    def initialize(path = nil, content = nil, priority: 10000)
      @path = path.to_s
      @content = content
      @priority = priority
      @children = []
    end

    def id
      Utils.id(content_value(:id, path)) unless root?
    end

    def name
      segments.last unless root?
    end

    def label
      content_value(:label, name.titleize) unless root?
    end

    def priority
      content_value(:priority, @priority)
    end

    def type
      content_value(:type, :directory)
    end

    def depth
      path.split("/").size
    end

    def add_child(name, content = nil, priority: 10000)
      children << TreeNode.new("#{path}/#{name}", content, priority: priority)
    end

    def has_child?(name)
      !!get_child(name)
    end

    def get_child(name)
      children.find { |child| child.name == name }
    end

    def content?
      content.present?
    end

    def root?
      depth == 0
    end

    def url_path(**params)
      if content? && content.respond_to?(:url_path)
        content.url_path(**params)
      end
    end

    def lookup_hash
      content? ? content.lookup_hash : Digest::SHA256.hexdigest(id)[0..8]
    end
    alias_method :to_key, :lookup_hash

    def each(&block)
      if block
        children.sort.each do |child|
          yield child
        end
      else
        to_enum(:each)
      end
    end

    def icon
      if type.in?([:scenario, :scenario_group])
        "square-dashed-mouse-pointer"
      elsif type == :preview
        "layers-2"
      elsif type == :page
        "file"
      else
        "folder"
      end
    end

    def <=>(other)
      if content?
        content <=> (other.content? ? other.content : other)
      else
        [priority, label] <=> [other.priority, other.label]
      end
    end

    def leaf?
      type.in?([:scenario, :scenario_group, :page])
    end

    def as_json
      {
        id: TreeNode.hash_id(id),
        href:,
        children: children.sort.map(&:as_json),
        leaf: leaf?,
        label:,
        type:,
        icon:
      }
    end

    protected

    def href
      url_path if leaf? || type == :preview && url_path.present?
    end

    def content_value(method_name, fallback = nil)
      value = content.send(method_name) if content
      value || fallback
    end

    def segments
      path.split("/")
    end

    class << self
      def hash_id(str, length: 6)
        hash = Digest::SHA1.hexdigest(str.to_s)
        hash.gsub!(/^([0-9]+)/, "")
        hash.slice(0, length)
      end
    end
  end
end
