module Lookbook
  class Inflector < Zeitwerk::Inflector
    def self.conditional_inflection_for(basename:, inflection:, path:)
      Module.new do
        define_method :camelize do |basename_, abspath|
          if basename_ == basename && path.match?(abspath)
            inflection
          else
            super(basename_, abspath)
          end
        end
      end
    end

    prepend conditional_inflection_for(
      basename: "ui",
      inflection: "UI",
      path: /\A#{Lookbook::Engine.root.join("app", "components")}/
    )

    def initialize
      @inflector = Rails::Autoloaders::Inflector
    end

    def camelize(basename, abspath)
      @inflector.camelize(basename, abspath)
    end

    def inflect(overrides)
      @inflector.inflect(overrides)
    end
  end
end
