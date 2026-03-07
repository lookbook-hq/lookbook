module Lookbook
  module Loggable
    extend ActiveSupport::Concern

    included do
      def logger
        Lookbook.logger
      end

      [:debug, :info, :warn, :error, :fatal].each do |level|
        define_method(level) do |*args|
          logger.send(level, *args)
        end
      end
    end
  end
end
