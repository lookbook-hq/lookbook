module Lookbook
  module PreviewHelper
    def lookbook_display(key, fallback = nil)
      params.dig(:lookbook, :display, key.to_sym) || fallback
    end
  end
end
