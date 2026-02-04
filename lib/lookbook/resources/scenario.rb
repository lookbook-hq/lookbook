module Lookbook
  class Scenario < ResourceNode
    def icon = "layers-2"

    def url_path = lookbook_scenario_path(parent, self)

    def to_param = @entity.ref.raw
  end
end
