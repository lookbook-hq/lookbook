# frozen_string_literal: true

module Lookbook
  class Config
    class << self
      alias_method :default, :new

      def defaults
        Options.new(
          project: {
            name: "Lookbook"
          },

          collections: {
            previews: {
              path: "lookbook",
              watch_extensions: []
            }
          },

          scenarios: {
            default_layout: nil,
            controller: "LookbookScenarioController"
          },

          pages: {
            default_layout: "lookbook/pages",
            controller: "LookbookPageController"
          },

          enabled: Rails.env.local?,

          reload_on_change: nil
        )
      end
    end

    # Returns the current Lookbook::Config instance
    #
    # @!attribute current
    # @return [Lookbook::Config]
    class_attribute :current, default: defaults, instance_predicate: false

    def initialize
      @config = self.class.defaults
    end

    delegate_missing_to :config

    private

    attr_reader :config
  end
end
