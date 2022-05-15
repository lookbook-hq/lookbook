module Lookbook
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    helper Lookbook::ApplicationHelper
    helper Lookbook::OutputHelper
    helper Lookbook::ComponentHelper

    before_action :load_theme_css

    def self.controller_path
      "lookbook"
    end

    def index
      landing = Lookbook.pages.find(&:landing) || Lookbook.pages.first
      if landing.present?
        redirect_to page_path(landing.lookup_path)
      end
    end

    protected

    def load_theme_css
      @theme_css = nil
      theme_file = Lookbook.config.ui_theme_css
      if theme_file.present?
        if File.exist? theme_file
          @theme_css = File.read(theme_file)
        else
          Lookbook.logger.warn "Could not find theme file #{Lookbook.config.ui_theme_css}"
        end
      end
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
