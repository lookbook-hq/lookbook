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

    def render_in_layout(path, layout: nil, **locals)
      @error = locals[:error]
      render path, layout: layout.presence || (params[:lookbook_embed] ? "lookbook/basic" : "lookbook/application"), locals: locals
    end
  end
end
