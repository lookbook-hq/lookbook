module Lookbook
  class InspectorController < ApplicationController
    before_action :assign_preview, only: %i[show]

    def index
    end

    def show
    end

    private

    def assign_preview
      @preview = Previews.find_by_id(params[:id])
      raise PreviewNotFoundError, "Count not find preview with lookup path '#{params[:id]}'" unless @preview
    end
  end
end
