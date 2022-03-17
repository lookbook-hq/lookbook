module Lookbook
  class PageController < ActionController::Base
    helper Lookbook::PageHelper

    Lookbook.config.page_paths.each do |path|
      prepend_view_path Rails.root.join(path)
    end
  end
end
