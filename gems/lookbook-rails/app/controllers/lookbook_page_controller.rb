require "rails/application_controller"

class LookbookPageController < ::ApplicationController
  include Lookbook::RenderActions
  include Lookbook::Unannotatable
end
