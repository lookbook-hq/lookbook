module Lookbook
  class PagesController < ApplicationController
    include Lookbook::PageActions

    before_action :assign_page

    def show
    end
  end
end
