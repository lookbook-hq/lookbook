module Helpers
  module Rendering
    include Nanoc::Helpers::Rendering

    def render(identifier, other_assigns = {}, &block)
      super("/#{identifier.delete_prefix("/")}", other_assigns, &block)
    end
  end
end
