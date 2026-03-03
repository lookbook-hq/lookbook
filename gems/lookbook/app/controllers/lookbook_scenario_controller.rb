require "rails/application_controller"

class LookbookScenarioController < Rails::ApplicationController
  include Lookbook::RenderActions
  include Lookbook::Unannotatable
  include Lookbook::WithScenario

  def preview
    render "lookbook/preview", render_options
  end

  private def default_preview_layout
    Lookbook.config.scenarios.default_layout
  end
end
