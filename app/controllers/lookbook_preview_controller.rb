require "rails/application_controller"

class LookbookPreviewController < ApplicationController
  include Lookbook::PreviewControllerActions
end
