# frozen_string_literal: true

module Booklet
  module YARD
    class HiddenTag < Tag
      include BooleanTag

      tag_name :hidden
    end
  end
end
