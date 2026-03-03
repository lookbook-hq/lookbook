module Lookbook
  class StaticController < Lookbook::ApplicationController
    def static
      respond_to do |format|
        format.html { render inertia: params[:component] }
      end
    end
  end
end
