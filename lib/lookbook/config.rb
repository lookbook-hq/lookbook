module Lookbook
  class Config
    class << self
      alias_method :default, :new

      def defaults
        ActiveSupport::OrderedOptions.new.merge!({})
      end
    end

    class_attribute :current, default: defaults, instance_predicate: false

    def initialize
      @config = self.class.defaults
    end

    delegate_missing_to :config

    private

    attr_reader :config
  end
end
