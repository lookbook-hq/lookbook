module Lookbook
  class VirtualPageEntity < Entity
    delegate :data, :header?, :content, to: :metadata

    attr_reader :lookup_path, :url_path, :metadata

    def initialize(lookup_path, file_contents = nil, url_path: nil, options: {})
      @lookup_path = lookup_path
      @url_path = url_path
      @metadata = PageMetadata.new(file_contents, options)
    end

    def id
      @id ||= Utils.id(lookup_path)
    end

    def name
      @name ||= Utils.name(File.basename(lookup_path))
    end

    def label
      metadata.fetch(:label, super)
    end

    def title
      metadata.fetch(:title, label)
    end

    def url_param = lookup_path

    def hidden? = false

    def footer? = false

    def parent = nil

    def next = nil

    def previous = nil

    def file_path = nil

    def relative_file_path = nil
  end
end
