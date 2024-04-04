class LookbookPreviewController < ApplicationController
  include Lookbook::PreviewControllerActions
  helper Lookbook::AssetHelper
end
