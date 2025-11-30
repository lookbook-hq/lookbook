module Lookbook
  module UrlHelper
    def current_section?(name)
      current_section = if controller.is_a?(Lookbook::SpecsController) || controller.is_a?(Lookbook::ScenariosController)
        :specs
      elsif controller.is_a?(Lookbook::PagesController)
        :pages
      else
        :other
      end

      current_section == name
    end

    def lookbook_latest_spec_path
      if current_section?(:specs)
        lookbook_specs_path
      else
        cookies[:lookbook_last_spec_visited] || lookbook_specs_path
      end
    end

    def lookbook_latest_page_path
      if current_section?(:pages)
        lookbook_pages_path
      else
        cookies[:lookbook_last_page_visited] || lookbook_pages_path
      end
    end
  end
end
