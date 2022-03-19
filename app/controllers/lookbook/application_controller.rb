module Lookbook
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    helper Lookbook::ApplicationHelper
    helper Lookbook::OutputHelper
    helper Lookbook::ComponentHelper

    def self.controller_path
      "lookbook"
    end
  end
end
