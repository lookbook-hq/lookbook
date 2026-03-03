# frozen_string_literal: true

module Lookbook
  module Inertia
    module Helper
      def inertia_rendering?
        controller.instance_variable_get(:@_inertia_rendering)
      end

      def inertia_page
        controller.instance_variable_get(:@_inertia_page)
      end

      def inertia_meta_tags
        meta_tag_data = (inertia_page || {}).dig(:props, :_inertia_meta) || []

        meta_tags = meta_tag_data.map do |inertia_meta_tag|
          inertia_meta_tag.to_tag(tag)
        end

        safe_join(meta_tags, "\n")
      end

      def inertia_root(id: "app", page: inertia_page)
        safe_join([
          tag.script(page.to_json.html_safe, "data-page": id, type: "application/json"),
          tag.div(id: id)
        ], "\n")
      end
    end
  end
end
