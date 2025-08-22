module Lookbook
  class PreviewsController < ApplicationController
    before_action :assign_subject
    before_action :assign_group
    before_action :assign_scenario
    before_action :assign_preview

    def show
    end
  end
end
