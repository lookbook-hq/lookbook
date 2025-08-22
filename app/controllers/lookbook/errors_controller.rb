module Lookbook
  class ErrorsController < ApplicationController
    layout "lookbook/skeleton"

    def not_found
      render status: :not_found
    end
  end
end
