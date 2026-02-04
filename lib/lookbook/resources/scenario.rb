module Lookbook
  class Scenario < ResourceNode
    def icon = "layers-2"

    def url_path = lookbook_scenario_path(parent, self)

    def preview_path(params)
      Rails.application.routes.url_helpers.lookbook_preview_path(parent, self, **params)
    end

    def to_param = @entity.ref.raw
  end
end
