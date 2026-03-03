module Lookbook
  class Scenario < ResourceNode
    inertia_props :id, :label, :children, :href, [:leaf, :leaf?]

    def icon = "layers-2"

    def source = @entity.source

    def url_path = scenario_path(self)

    alias_method :href, :url_path

    def preview_path(**qp)
      Rails.application.routes.url_helpers.lookbook_scenario_preview_path(self, {params: path_params(qp)})
    end

    def call(locals = {})
      view_context = ViewContext.for(:scenarios)
      @entity.call(view_context, **locals.to_h)&.html_safe
    end

    private def path_params(params)
      params.key?(:params) ? params : {params:}
    end
  end
end
