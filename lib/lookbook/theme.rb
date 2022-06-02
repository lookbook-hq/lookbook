module Lookbook
  class Theme
    def initialize(config = {})
      @config = config
      @css = nil
    end

    def to_css
      return @css unless @css.nil?
      @css ||= if @config.present?
        styles = [":root {"]
        styles << @config.map do |key, value|
          "  --lookbook-#{key.to_s.underscore.gsub("_","-")}: #{value};"
        end
        styles.push "}"
        styles.join("\n")
      else
        ""
      end
    end
  end
end