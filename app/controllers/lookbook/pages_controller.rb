module Lookbook
  class PagesController < ApplicationController
    def self.controller_path
      "lookbook/pages"
    end

    def show
      @page = Lookbook::Page.find(params[:path])
      unless @page
        render "not_found"
      end
    end
  end
end
