module Lookbook
  class ParamFieldset::Component < Lookbook::Component
    renders_many :param_fields, Lookbook::ParamField::Component

    protected

    def alpine_component
      "paramFieldsetComponent"
    end
  end
end
