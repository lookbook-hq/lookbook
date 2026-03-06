module Booklet
  module AcceptsDisplayOptions
    extend ActiveSupport::Concern

    included do
      prop :display_options, Hash, default: -> { {} }, reader: :public

      def display_options=(options)
        @display_options = options
      end

      # def add_display_option(options)
      #   @display_options = @display_options.merge(options)
      # end
    end
  end
end
