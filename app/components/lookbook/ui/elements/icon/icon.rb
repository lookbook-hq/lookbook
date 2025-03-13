module Lookbook
  module UI
    class Icon < BaseComponent
      ICON_CACHE = {}

      attr_reader :name, :stroke

      def initialize(name:, stroke: 2, **kwargs)
        @name = name.to_s.tr("_", "-")
        @stroke = stroke
      end

      def icon
        tag.i(data: {lucide: name})
      end

      def read_svg
        if File.exist?(icon_path)
          File.read(icon_path).html_safe
        elsif Lookbook.env.development? || Lookbook.env.test?
          raise "`#{name}` is not a valid icon name"
        end
      end

      def icon_path
        Lookbook::Engine.root.join("public/lookbook-assets/icons/#{name}.svg")
      end
    end
  end
end
