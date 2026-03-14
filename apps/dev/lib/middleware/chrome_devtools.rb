# frozen_string_literal: true

require "digest"
require "json"

module Middleware
  # Chrome DevTools middleware that intercepts requests to the Chrome DevTools
  # `com.chrome.devtools.json` endpoint and returns a workspace configuration.
  #
  # This allows Chrome DevTools to automatically detect and connect to the project
  # workspace in their developer tools.
  #
  # For more info: See https://chromium.googlesource.com/devtools/devtools-frontend/+/main/docs/ecosystem/automatic_workspace_folders.md
  class ChromeDevtools
    NAMESPACE = "723b7bc5-aa31-4b9f-9c14-df23d93278a1"
    PATH = "/.well-known/appspecific/com.chrome.devtools.json"

    def initialize(app)
      @app = app
    end

    def call(env)
      return @app.call(env) unless env["PATH_INFO"] == PATH

      body = {
        workspace: {
          uuid: generate_uuid,
          root: Rails.root.to_s
        }
      }

      headers = {
        "Content-Type" => "application/json",
        "Cache-Control" => "public, max-age=31536000, immutable",
        "Expires" => (Time.now + 1.year).httpdate
      }

      [200, headers, [body.to_json]]
    end

    private

    def generate_uuid
      Digest::UUID.uuid_v5(NAMESPACE, Rails.root.to_s)
    end
  end
end
