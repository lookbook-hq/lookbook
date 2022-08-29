class ApplicationController < ActionController::Base
  helper Lookbook::PreviewHelper
  
  def index
    redirect_to lookbook_path
  end
end
