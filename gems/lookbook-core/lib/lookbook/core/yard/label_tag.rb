# frozen_string_literal: true

module Lookbook::Core
  module YARD
    class LabelTag < Tag
      include StringTag

      tag_name :label
    end
  end
end
