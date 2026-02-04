require "rails/application_controller"

class LookbookPreviewController < Rails::ApplicationController
  content_security_policy(false) if respond_to?(:content_security_policy)

  layout "lookbook/preview"

  def show
    @spec = Lookbook::Collection.specs.find { _1.to_param == params[:spec] }
    @scenario = @spec&.find { _1.to_param == params[:scenario] }

    raise Lookbook::NotFoundError, "Scenario not found" unless @scenario
  end
end
