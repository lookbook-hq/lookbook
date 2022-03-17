module Lookbook
  module ApplicationHelper
    def config
      Lookbook::Engine.config.lookbook
    end

    def feature_enabled?(name)
      Lookbook::Features.enabled?(name)
    end

    def markdown(text)
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, {
        tables: true,
        fenced_code_blocks: true,
        disable_indented_code_blocks: true
      })
      markdown.render(text).html_safe
    end

    def highlight(source, language, opts = {})
      formatter = Lookbook::CodeFormatter.new(opts)
      lexer = Rouge::Lexer.find(language)
      formatter.format(lexer.lex(source)).html_safe
    end

    def beautify(source, language = "html")
      source = source.strip
      result = language.downcase == "html" ? HtmlBeautifier.beautify(source) : source
      result.strip.html_safe
    end

    def component(name, **attrs, &block)
      render "lookbook/components/#{name}",
        classes: class_names(attrs[:class]),
        **attrs.except(:class),
        &block
    end

    def icon(name = nil, size: 4, **attrs)
      render "lookbook/components/icon",
        name: name,
        size: size,
        classes: class_names(attrs[:class]),
        **attrs.except(:class)
    end

    if Rails.version.to_f < 6.1
      def class_names(*args)
        tokens = build_tag_values(*args).flat_map { |value| value.to_s.split(/\s+/) }.uniq
        safe_join(tokens, " ")
      end
    end

    private

    def build_tag_values(*args)
      tag_values = []
      args.each do |tag_value|
        case tag_value
        when Hash
          tag_value.each do |key, val|
            tag_values << key.to_s if val && key.present?
          end
        when Array
          tag_values.concat build_tag_values(*tag_value)
        else
          tag_values << tag_value.to_s if tag_value.present?
        end
      end
      tag_values
    end
  end
end
