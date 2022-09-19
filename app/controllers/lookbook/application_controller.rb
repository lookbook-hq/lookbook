module Lookbook
  class ApplicationController < ActionController::Base
    before_action :base_auth, if: config.base_auth && Rails.env.production?

    if respond_to?(:content_security_policy)
      content_security_policy false, if: -> { Rails.env.development? }
    end

    protect_from_forgery with: :exception

    helper Lookbook::ApplicationHelper
    helper Lookbook::OutputHelper
    helper Lookbook::ComponentHelper

    before_action :generate_theme_overrides
    before_action :assign_collections

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

    def base_auth
      http_basic_authenticate_with name: ENV['LOOKBOOK_BASE_AUTH_NAME'], password: ENV['LOOKBOOK_BASE_AUTH_PASSWORD']
    end

    def generate_theme_overrides
      @theme_overrides ||= Lookbook.theme.to_css
    end

    def assign_collections
      @previews = Preview.all
      @pages = Page.all
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
