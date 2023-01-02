module ComponentSpecHelper
  def lookbook_scenario(lookup_path = "button/playground")
    Lookbook::Engine.previews.find_scenario_by_path(lookup_path)
  end
end
