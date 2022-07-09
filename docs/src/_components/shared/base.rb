module Shared
  class Base < ViewComponent::Base
    Bridgetown::ViewComponentHelpers.allow_rails_helpers :tag, :class_names, :safe_join, :raw
    include Bridgetown::ViewComponentHelpers

    def attrs
      @attrs ||= {}
      @attrs[:data] ||= {}
      @attrs[:data][:component] = component_name
      @attrs
    end

    def component_name
      @component_name ||= self.class.name.delete_prefix("Shared::").underscore.tr("/", "-").tr("_", "-")
    end
  end
end