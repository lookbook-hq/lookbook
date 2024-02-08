module Lookbook
  class ApplicationController < ActionController::Base
    before_action :assign_template_vars

    protected

    def assign_template_vars
      @config = Lookbook.config
      @previews = Previews.all
    end
  end
end
