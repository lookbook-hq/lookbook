module LookbookTestUtils
  extend ActiveSupport::Concern

  included do
    include Rails.application.routes.url_helpers
    include Lookbook::Engine.routes.url_helpers
  end

  class_methods do
    def rails_older_than?(version)
      Gem::Version.new(Rails.version) < Gem::Version.new(version)
    end

    def rails_newer_than?(version)
      Gem::Version.new(Rails.version) >= Gem::Version.new(version)
    end

    def phlexible?
      rails_newer_than?(6.1)
    end
  end
end
