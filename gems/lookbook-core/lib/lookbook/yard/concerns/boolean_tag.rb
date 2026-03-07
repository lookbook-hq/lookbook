# frozen_string_literal: true

module Lookbook
  module YARD
    module BooleanTag
      extend ActiveSupport::Concern

      included do
        def value = @text != "false"
      end
    end
  end
end
