require "rails/application_controller"

module Lookbook
  class PreviewController < Rails::ApplicationController
    content_security_policy(false) if respond_to?(:content_security_policy)

    private

    [:determine_layout, :prepend_application_view_paths, :prepend_preview_examples_view_path].each do |method_name|
      define_method method_name, ViewComponentsController.instance_method(method_name)
    end

    def default_preview_layout
      Lookbook.config.preview_layout
    end
  end
end
