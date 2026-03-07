# frozen_string_literal: true

module Lookbook::Rails
  module InertiaRequestPatch
    def inertia?
      key? "HTTP_X_INERTIA"
    end
  end
end
