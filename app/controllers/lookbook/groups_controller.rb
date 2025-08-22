module Lookbook
  class GroupsController < ApplicationController
    before_action :assign_subject
    before_action :assign_group, only: :show

    def show
    end
  end
end
