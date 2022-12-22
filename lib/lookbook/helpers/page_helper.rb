module Lookbook
  module PageHelper
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
