module Lookbook
  class PreviewsController < ApplicationController
    include Lookbook::PreviewActions

    before_action :assign_preview

    def overview
      @targets = Inspector.preview_targets(@preview)
    end
  end
end
