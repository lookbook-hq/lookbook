# frozen_string_literal: true

module Lookbook
  module InertiaHelper
    def inertia_rendering?
      controller.instance_variable_get(:@_inertia_rendering)
    end

    def inertia_page
      controller.instance_variable_get(:@_inertia_page)
    end

    def inertia_root(id: "app", page: inertia_page)
      safe_join([
        tag.script(page.to_json.html_safe, "data-page": id, type: "application/json"),
        tag.div(id: id)
      ], "\n")
    end
  end
end
