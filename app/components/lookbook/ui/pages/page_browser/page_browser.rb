module Lookbook
  module UI
    class PageBrowser < BaseComponent
      attr_reader :src, :checksum

      def initialize(src:, checksum: nil, **kwargs)
        @src = src
        @checksum = checksum
      end
    end
  end
end
