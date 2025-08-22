module Lookbook
  module Ui
    class PartialsController < ApplicationController
      # layout "lookbook/layouts/skeleton"

      def show
        render partial: "lookbook/partials/#{params[:partial]}", locals: locals
      end

      protected

      def locals
        request.query_parameters.deep_symbolize_keys
      end
    end
  end
end
