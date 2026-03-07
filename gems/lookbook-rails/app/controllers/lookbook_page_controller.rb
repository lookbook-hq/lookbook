require "rails/application_controller"

class LookbookPageController < Rails::ApplicationController
  include Lookbook::RenderActions
  include Lookbook::Unannotatable
end
