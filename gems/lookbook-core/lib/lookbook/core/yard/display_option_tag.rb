# frozen_string_literal: true

module Lookbook::Core
  module YARD
    class DisplayOptionTag < Tag
      include KeyValueTag

      tag_name :display
    end
  end
end
