module Lookbook
  class Config
    class << self
      alias_method :default, :new

      def defaults
        ActiveSupport::OrderedOptions.new.merge!({
          preview_paths: ["#{Rails.root}/test/components/previews"],
          preview_watch_extensions: ["rb", "html.*"],

          reload_on_change: nil
        })
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
