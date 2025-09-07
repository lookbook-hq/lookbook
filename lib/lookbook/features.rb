module Lookbook
  module Features
    # Simple feature flag system.
    #
    # Feature flags are defined in `config/feature_flags.yml` and can be enabled
    # via ENV var or by adding the feature name to the `config.experimental_features` array.
    class << self
      def configuration
        defaults = Rails.application.config_for(config_path) || {}
        user_enabled_features.with_defaults(defaults)
      end

      def enabled?(feature_name)
        configuration[feature_name.to_sym].present?
      end

      private

      def user_enabled_features
        Lookbook.config.experimental_features.map { [_1, true] }.to_h
      end

      def config_path
        Engine.root.join("config/feature_flags.yml")
      end
    end
  end
end
