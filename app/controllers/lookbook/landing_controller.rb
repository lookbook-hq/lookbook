module Lookbook
  class LandingController < ApplicationController
    def index
      landing = @pages.find(&:landing?)
      redirect_to landing.url_path if landing
    end
  end
end
