module Pages
  module Examples
    class PartialsPagePreview < Lookbook::Preview
      def default
        render template: "pages/partials"
      end
    end
  end
end
