class ApplicationController < ActionController::Base
  def index
    redirect_to lookbook_path
  end
end
