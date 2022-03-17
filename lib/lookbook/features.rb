module Lookbook
  module Features
    EXPERIMENTAL_FEATURES = [:pages]

    def self.experimental_feature?(name)
      EXPERIMENTAL_FEATURES.include?(name.to_sym)
    end

    def self.enabled?(name)
      return true unless experimental_feature?(name)
      enabled.include?(name.to_sym)
    end

    def self.enabled
      if Lookbook.config.experimental_features == true
        EXPERIMENTAL_FEATURES
      elsif Lookbook.config.experimental_features.blank?
        []
      else
        Lookbook.config.experimental_features.map(&:to_sym)
      end
    end
  end
end
