# frozen_string_literal: true

module Lookbook
  module InertiaRequestPatch
    def inertia?
      key? "HTTP_X_INERTIA"
    end

    def inertia_partial?
      key?("HTTP_X_INERTIA_PARTIAL_COMPONENT")
    end
  end
end
