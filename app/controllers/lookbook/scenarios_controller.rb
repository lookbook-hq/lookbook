module Lookbook
  class ScenariosController < ApplicationController
    before_action :assign_subject
    before_action :assign_group
    before_action :assign_scenario, only: :show

    def show
    end
  end
end
