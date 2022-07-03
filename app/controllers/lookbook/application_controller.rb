module Lookbook
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    helper Lookbook::ApplicationHelper
    helper Lookbook::OutputHelper
    helper Lookbook::ComponentHelper

    before_action :generate_theme_overrides

    def self.controller_path
      "lookbook"
    end

    def index
      landing = Lookbook.pages.find(&:landing) || Lookbook.pages.first
      if landing.present?
        redirect_to lookbook_page_path(landing.lookup_path)
      else
        render "lookbook/index"
      end
    end

    protected

    def generate_theme_overrides
      @theme_overrides ||= Lookbook::Theme.new(Lookbook.config.ui_theme_overrides).to_css
    end

    def feature_enabled?(feature)
      Lookbook::Features.enabled?(feature)
    end

    def render_in_layout(path, layout: nil, **locals)
      @error = locals[:error]
      render path, layout: layout.presence || (params[:lookbook_embed] ? "lookbook/basic" : "lookbook/application"), locals: locals
    end
  end
end
