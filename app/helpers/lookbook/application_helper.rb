module Lookbook
  module ApplicationHelper
    def lookbook_asset_path(file, version: true)
      path = "/lookbook-assets/#{file}".gsub("//", "/")
      version ? "#{path}?v=#{Lookbook::VERSION}" : path
    end

    def lookbook_landing_path
      landing = Engine.pages.find(&:landing?) || Engine.pages.first
      if landing.present?
        lookbook_page_path landing.lookup_path
      else
        lookbook_home_path
      end
    end

    unless respond_to? :class_names
      def class_names(*args)
        tokens = build_tag_values(*args).flat_map { |value| value.to_s.split(/\s+/) }.uniq

        safe_join(tokens, " ")
      end

      def build_tag_values(*args)
        tag_values = []

        args.each do |tag_value|
          case tag_value
          when Hash
            tag_value.each do |key, val|
              tag_values << key.to_s if val && key.present?
            end
          when Array
            tag_values.concat build_tag_values(*tag_value)
          else
            tag_values << tag_value.to_s if tag_value.present?
          end
        end

        tag_values
      end
    end
  end
end
