module Lookbook
  module Entities
    class ScenariosController < ApplicationController
      include Lookbook::AssignsPreviewsConcern

      before_action :assign_preview_and_scenario, only: :show

      layout false

      def show
      end
    end
  end
end
