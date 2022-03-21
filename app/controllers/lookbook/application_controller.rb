module Lookbook
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    helper Lookbook::ApplicationHelper
    helper Lookbook::OutputHelper
    helper Lookbook::ComponentHelper

    def self.controller_path
      "lookbook"
    end

    def index
      if feature_enabled? :pages
        landing = Lookbook.pages.find(&:landing) || Lookbook.pages.first
        if landing.present?
          redirect_to page_path(landing.lookup_path)
        end
      end
    end

    protected

    def feature_enabled?(feature)
      Lookbook::Features.enabled?(feature)
    end
  end
end
