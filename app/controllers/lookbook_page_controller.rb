require "rails/application_controller"

class LookbookPageController < Rails::ApplicationController
  include Lookbook::PageControllerActions
end
