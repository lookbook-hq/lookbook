module Lookbook
  module Loggable
    extend ActiveSupport::Concern

    [:debug, :info, :warn, :error, :fatal].each do |level|
      define_method(level) do |message|
        Lookbook.logger.send(level, "[LOOKBOOK] #{message}")
      end
    end
  end
end
