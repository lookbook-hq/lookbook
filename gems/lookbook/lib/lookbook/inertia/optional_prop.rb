# frozen_string_literal: true

module Lookbook
  module Inertia
    class OptionalProp < IgnoreOnFirstLoadProp
      prepend PropOnceable
    end
  end
end
