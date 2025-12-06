module Lookbook
  class SpecsController < Lookbook::ApplicationController
    include WithCollections

    # include WithSpecs

    # include WithScenarios

    # before_action :assign_spec, only: [:show]
    # before_action :record_last_spec_visited, only: %i[show]

    def index
      # redirect_to lookbook_path unless @specs.any?
    end

    def show
    end
  end
end
