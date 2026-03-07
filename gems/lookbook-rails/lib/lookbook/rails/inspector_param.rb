module Lookbook::Rails
  class InspectorParam < Lookbook::Object
    include Lookbook::InertiaRails::Serializable

    prop :param, Lookbook::Param, :positional

    inertia_props :id, :name, :label, :description, :control_type,
      :required, :hidden, :options, :input_choices, :value, :value_type

    def id = "#{name.to_s.parameterize}-param"

    def hidden = !@param.explicit?

    delegate_missing_to :@param
  end
end
