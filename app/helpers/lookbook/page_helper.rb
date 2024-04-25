module Lookbook
  module PageHelper
    include AssetHelper

    define_method :lb_page, AppHelper.instance_method(:lb_page)
    define_method :lb_code, AppHelper.instance_method(:lb_code)
    define_method :lb_prose, AppHelper.instance_method(:lb_prose)

    def lookbook_page_path(identifier, **kwargs)
      page = Lookbook::Pages.resolve_page(identifier)
      lookbook.show_page_path(page, **kwargs)
    end

    # def lookbook_preview_path(preview, target = nil, **kwargs)
    #   preview = Lookbook::Previews.resolve_preview(preview)
    #   target.nil? ? lookbook.show_preview_path(preview, **kwargs) : lookbook.inspect_target_path(preview, target, **kwargs)
    # end
  end
end
