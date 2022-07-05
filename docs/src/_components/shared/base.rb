module Shared
  class Base < ViewComponent::Base
    Bridgetown::ViewComponentHelpers.allow_rails_helpers :tag, :class_names, :safe_join
    include Bridgetown::ViewComponentHelpers
  end
end