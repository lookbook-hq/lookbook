require "rails/application_controller"
class LookbookPreviewController < Rails::ApplicationController
  include Lookbook::PreviewControllerActions
  helper Lookbook::AssetHelper
  helper Lookbook::PreviewHelper
end
