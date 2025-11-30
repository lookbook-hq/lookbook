module Lookbook
  module ApplicationHelper
    # TODO: Add this to the param instance
    def option_text_and_value(option)
      # Options are [text, value] pairs or strings used for both.
      if !option.is_a?(String) && option.respond_to?(:first) && option.respond_to?(:last)
        option = option.reject { |e| Hash === e } if Array === option
        [option.first, option.last]
      else
        [option, option]
      end
    end

    def request_path_hash
      Digest::SHA256.hexdigest(request.path)[0..7]
    end

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
  end
end
