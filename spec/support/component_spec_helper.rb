module ComponentSpecHelper
  def lookbook_scenario(lookup_path = "standard/default")
    Lookbook::Engine.previews.find_scenario_by_path(lookup_path)
  end
end
