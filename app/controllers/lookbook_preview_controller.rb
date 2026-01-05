require "rails/application_controller"

class LookbookPreviewController < Rails::ApplicationController
  content_security_policy(false) if respond_to?(:content_security_policy)
end
