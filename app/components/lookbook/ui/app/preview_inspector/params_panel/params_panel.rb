module Lookbook
  module UI
    class ParamsPanel < BaseComponent
      with_slot :param do |param:, value:|
        @editables << {param: param, value: value}
      end

      attr_reader :editables

      def initialize(**kwargs)
        @editables = []
      end
    end
  end
end
