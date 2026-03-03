module Lookbook
  class StartController < ApplicationController
    def show
      render inertia: {}
    end
  end
end
