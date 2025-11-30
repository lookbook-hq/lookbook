module Lookbook
  class ScenariosController < Lookbook::ApplicationController
    include WithSpecs
    include WithScenarios
    include WithDisplayOptions

    before_action :assign_spec, only: :show
    before_action :assign_scenario, only: :show
    before_action :assign_scenarios, only: :show
    before_action :assign_display_options, only: :show
    before_action :assign_params, only: :show
    before_action :record_last_spec_visited, only: %i[show]

    def index
    end

    def show
    end
  end
end
