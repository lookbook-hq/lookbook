module Lookbook
  module UI
    class MetadataTable < BaseComponent
      attr_reader :entries

      def initialize(**kwargs)
        @entries = []
      end

      def with_entry(name, value)
        @entries << DataObject.new(name: name, value: value)
      end
    end
  end
end
