# frozen_string_literal: true

module Lookbook
  module YARD
    class HiddenTag < Tag
      include BooleanTag

      tag_name :hidden
    end
  end
end
