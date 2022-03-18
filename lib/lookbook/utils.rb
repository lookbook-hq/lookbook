module Lookbook
  module Utils
    POSITION_PREFIX_REGEX = /^(\d+?)[-_]/
    FRONTMATTER_REGEX = /\A---(.|\n)*?---/

    def generate_id(*args)
      parts = args.map { |arg| arg.to_s.underscore }
      parts.join("-").tr("/", "-").tr("_", "-").delete_prefix("-").delete_suffix("-")
    end

    def preview_class_basename(klass)
      class_name(klass).to_s.chomp("ComponentPreview").chomp("Component::Preview").chomp("::Preview").chomp("::")
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

    def parse_position_prefix(str)
      pos = str.match(POSITION_PREFIX_REGEX)
      if pos.nil?
        [10000, str]
      else
        cleaned_str = str.gsub(POSITION_PREFIX_REGEX, "")
        [pos[1].to_i, cleaned_str]
      end
    end

    def parse_frontmatter(content)
      frontmatter = content.match(FRONTMATTER_REGEX)
      if frontmatter.nil?
        [{}, content]
      else
        [YAML.safe_load(frontmatter[0]), content.gsub(FRONTMATTER_REGEX, "")]
      end
    end

    def strip_frontmatter(content)
      content.gsub(FRONTMATTER_REGEX, "")
    end
  end
end
