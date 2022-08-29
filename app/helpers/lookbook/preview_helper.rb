module Lookbook
  module PreviewHelper
    def lookbook_display(key, fallback = nil)
      params.dig(:lookbook, :display, key.to_sym) || fallback
    end

    def lookbook_data(key, fallback = nil)
      Lookbook.data.get(key, fallback)
    end
  end
end
