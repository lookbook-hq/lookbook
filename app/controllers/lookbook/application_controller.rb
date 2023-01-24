module Lookbook
  class ApplicationController < ActionController::Base
    content_security_policy(false) if respond_to?(:content_security_policy)

    protect_from_forgery with: :exception

    helper Lookbook::ApplicationHelper
    helper Lookbook::OutputHelper
    helper Lookbook::ComponentHelper

    before_action :generate_theme_overrides
    before_action :assign_instance_vars

    def self.controller_path
      "lookbook"
    end

    def index
      landing = Lookbook.pages.find(&:landing?) || Lookbook.pages.first

      if landing.present?
        redirect_to lookbook_page_path(landing.path)
      else
        render "lookbook/index"
      end
    end

    protected

    def generate_theme_overrides
      @theme_overrides ||= Lookbook.theme.to_css
    end

    def assign_instance_vars
      @previews = Lookbook.previews
      @pages = Lookbook.pages
      @config = Lookbook.config
      @engine = Lookbook.engine
    end

    def feature_enabled?(feature)
      Lookbook::Features.enabled?(feature)
    end

    def render_in_layout(path, layout: nil, **locals)
      @error = locals[:error]
      render path, layout: layout.presence || (params[:lookbook_embed] ? "lookbook/basic" : "lookbook/application"), locals: locals
    end

    def prettify_error(exception)
      error_params = {}
      if exception.is_a?(ViewComponent::PreviewTemplateError)
        error_params = {
          file_path: @preview&.file_path,
          line_number: 0,
          source_code: @target&.source
        }
      end
      Lookbook::Error.new(exception, **error_params)
    end
  end
end
