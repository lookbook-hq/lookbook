module Lookbook
  class PreviewsController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_preview

    def overview
    end
  end
end
