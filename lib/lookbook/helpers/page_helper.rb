module Lookbook
  # Helpers for documentation page templates
  #
  # @api public
  module PageHelper
    # Returns the URL path to a page.
    #
    # @param id [String, PageEntity] The id or PageEntity instance to generate a URL path for
    def page_path(id)
      page = id.is_a?(PageEntity) ? id : Engine.pages.find_by_id(id)
      if page.present?
        lookbook_page_path page.lookup_path
      else
        Lookbook.logger.warn "Could not find page with id ':#{id}'"
      end
    end
  end
end
