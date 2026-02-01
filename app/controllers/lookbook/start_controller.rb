module Lookbook
  class StartController < ApplicationController
    include CollectionScoped

    layout "lookbook/application"

    def index
    end
  end
end
