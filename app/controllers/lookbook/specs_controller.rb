module Lookbook
  class SpecsController < Lookbook::ApplicationController
    include WithSpecs

    before_action :assign_spec, only: [:show]
    before_action :record_last_spec_visited, only: %i[show]

    def index
    end

    def show
    end
  end
end
