module Lookbook
  module Env
    class << self
      def development?
        ENV["LOOKBOOK_ENV"] == "development"
      end

      def production?
        !development?
      end

      def to_s
        development? ? "development" : "production"
      end
    end
  end
end
