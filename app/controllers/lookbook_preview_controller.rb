require "rails/application_controller"
class LookbookPreviewController < Rails::ApplicationController
  include Lookbook::PreviewControllerActions
end
