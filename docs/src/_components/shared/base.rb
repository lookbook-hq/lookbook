module Shared
  class Base < ViewComponent::Base
    Bridgetown::ViewComponentHelpers.allow_rails_helpers :tag
    include Bridgetown::ViewComponentHelpers
  end
end