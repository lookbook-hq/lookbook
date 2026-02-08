require "rails/application_controller"

class LookbookPreviewController < Rails::ApplicationController
  include Lookbook::Unannotatable

  content_security_policy(false) if respond_to?(:content_security_policy)

  around_action :without_annotations

  def show
    @spec = Lookbook::Collection.specs.find { _1.to_param == params[:spec] }
    @scenario = @spec&.find { _1.to_param == params[:scenario] }

    raise Lookbook::NotFoundError, "Scenario not found" unless @scenario

    render "lookbook/previews/show", layout: "lookbook/preview"
  end
end
