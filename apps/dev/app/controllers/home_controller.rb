class HomeController < ApplicationController
  def show
    redirect_to lookbook_path
  end
end
