module Lookbook
  module Utils
    include Lookbook::Engine.routes.url_helpers

    POSITION_PREFIX_REGEX = /^(\d+?)[-_]/
    FRONTMATTER_REGEX = /\A---(.|\n)*?---/

    protected

    def generate_id(*args)
      parts = args.map { |arg| arg.to_s.force_encoding("UTF-8").parameterize.underscore }
      parts.join("-").tr("/_", "-").delete_prefix("-").delete_suffix("-").gsub("--", "-")
    end

    def preview_class_basename(klass)
      class_name(klass).to_s.chomp("ComponentPreview").chomp("Component::Preview").chomp("::Preview").chomp("Component").chomp("Preview").chomp("::")
    end

    def preview_class_path(klass)
      preview_class_basename(klass).underscore
    end

    def class_name(klass)
      klass.is_a?(Class) ? klass.name : klass
    end

    def normalize_matchers(*matchers)
      matchers.flatten.map { |m| m.gsub(/\s/, "").downcase }
    end

    def get_position_prefix(str)
      parse_position_prefix(str).first
    end

    def remove_position_prefix(str)
      parse_position_prefix(str).last
    end

    def to_lookup_path(path)
      path.split("/").map { |segment| remove_position_prefix(segment) }.join("/")
    end

    def to_preview_path(*args)
      args.flatten.map { |arg| preview_class_path(arg) }.join("/")
    end

    protected

    def default_url_options
      {}
    end

    private

    def parse_position_prefix(str)
      pos = str.match(POSITION_PREFIX_REGEX)
      if pos.nil?
        [10000, str]
      else
        cleaned_str = str.gsub(POSITION_PREFIX_REGEX, "")
        [pos[1].to_i, cleaned_str]
      end
    end
  end
end
