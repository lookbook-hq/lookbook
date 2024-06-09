module Lookbook
  module FeatureChecks
    extend ActiveSupport::Concern

    def view_component_available?
      @has_view_component ||= Utils.gem_installed?("view_component")
    end

    def listen_available?
      @has_listen ||= Utils.gem_installed?("listen") && defined?(::Listen)
    end

    def action_mailer_available?
      @has_action_mailer ||= !!defined?(::ActionMailer)
    end
  end
end
