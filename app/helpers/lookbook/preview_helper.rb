module Lookbook
  module PreviewHelper
    def lookbook_display(key, fallback = nil)
      params[:lookbook][:display][key.to_sym] || fallback
    end
  end
end
