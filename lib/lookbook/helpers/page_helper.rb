module Lookbook
  module PageHelper
    COMPONENT_HELPERS = %i[lb_table lb_icon lb_button lb_button_group markdown].freeze

    COMPONENT_HELPERS.each do |name|
      define_method name, AppHelper.instance_method(name)
    end

    def page_path(identifier, **kwargs)
      page = Lookbook::Pages.resolve_page(identifier)
      lookbook.page_path(page, **kwargs) if page
    end

    def preview_path(preview_identifier, target_identifier = nil, **kwargs)
      preview = Lookbook::Previews.resolve_preview(preview_identifier)
      if preview
        if target_identifier.nil?
          lookbook.preview_page_path(preview, **kwargs)
        else
          target = preview.resolve_target(target_identifier)
          lookbook.inspect_target_path(preview, target, **kwargs) if target
        end
      end
    end
  end
end
