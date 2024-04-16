module Lookbook
  module PageHelper
    include AssetHelper

    define_method :lb_page, AppHelper.instance_method(:lb_page)
    define_method :lb_code, AppHelper.instance_method(:lb_code)
    define_method :lb_prose, AppHelper.instance_method(:lb_prose)

    define_method :lookbook_page_path, AppHelper.instance_method(:lookbook_page_path)
    define_method :lookbook_preview_path, AppHelper.instance_method(:lookbook_preview_path)
  end
end
