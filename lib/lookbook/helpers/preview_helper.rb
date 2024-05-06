module Lookbook
  module PreviewHelper
    def lookbook_display(key, fallback = nil)
      @display_options.fetch(key, fallback)
    end
  end
end
