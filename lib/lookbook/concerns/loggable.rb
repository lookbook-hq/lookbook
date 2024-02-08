module Lookbook
  module Loggable
    extend ActiveSupport::Concern

    [:debug, :info, :warn, :error, :fatal].each do |level|
      define_method(level) do |*args|
        Lookbook.logger.send(level, *args) if Utils.main_process?
      end
    end
  end
end
