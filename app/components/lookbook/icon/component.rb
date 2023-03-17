module Lookbook
  class Icon::Component < Lookbook::BaseComponent
    ICON_CACHE = {}

    attr_reader :stroke

    def initialize(name:, size: 4, stroke: 2, **html_attrs)
      @icon_name = name.to_s.tr("_", "-")
      @size = size || 4
      @stroke = stroke
      super(**html_attrs)
    end

    def size_rems
      "#{@size * 0.25}rem"
    end

    def svg
      ICON_CACHE[@icon_name] ||= read_svg
    end

    def read_svg
      File.read(svg_path).html_safe
    rescue
      if Rails.env.development? || Rails.env.test?
        raise "`#{@icon_name}` is not a valid icon name"
      end
    end

    def svg_path
      Lookbook::Engine.root.join("assets/icons/#{@icon_name}.svg")
    end
  end
end
