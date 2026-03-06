# frozen_string_literal: true

require "commonmarker"

module Booklet
  module Markdown
    class Processor < Booklet::Object
      prop :parse, Options, reader: :public, default: -> { {} }, &Options.coerce
      prop :render, Options, reader: :public, default: -> { {} }, &Options.coerce
      prop :extension, Options, reader: :public, default: -> { {} }, &Options.coerce
      prop :plugins, Options, reader: :public, default: -> { {} }, &Options.coerce

      def parse(str) = Commonmarker.parse(str, options:)

      def format(ast) = ast.to_html(plugins: plugins.to_h)

      def options
        {
          parse: @parse.to_h,
          render: @render.to_h,
          extension: @extension.to_h
        }
      end
    end
  end
end
