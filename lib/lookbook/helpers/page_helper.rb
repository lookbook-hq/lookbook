module Lookbook
  module PageHelper
    COMPONENT_HELPERS = %i[lb_table lb_icon lb_button lb_button_group markdown].freeze

    COMPONENT_HELPERS.each do |name|
      define_method name, AppHelper.instance_method(name)
    end

    include Lookbook::PathHelper
  end
end
