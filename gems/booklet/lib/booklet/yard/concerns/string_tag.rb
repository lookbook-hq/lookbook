# frozen_string_literal: true

module Booklet
  module YARD
    module StringTag
      extend ActiveSupport::Concern

      included do
        def value = @text

        def to_s = value
      end
    end
  end
end
