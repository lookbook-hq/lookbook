module Lookbook
  class Code::Component < Lookbook::Component
    def initialize(
      source = nil,
      language: :html,
      line_numbers: false,
      highlight_lines: [],
      start_line: 1,
      wrap: false,
      theme: :github_light,
      full_height: false,
      **html_attrs
    )
      @source = source
      @highlight_opts = {
        language: language,
        line_numbers: line_numbers,
        highlight_lines: highlight_lines,
        start_line: start_line
      }
      @highlight_lines = highlight_lines
      @wrap = wrap
      @theme = theme
      @full_height = full_height
      super(**html_attrs)
    end

    def theme_classname
      "theme-#{@theme.to_s.tr("_", "-")}"
    end

    def source
      (@source || content).strip_heredoc.strip
    end

    def numbered?
      @highlight_opts[:line_numbers] == true
    end

    def focussed?
      @highlight_opts[:highlight_lines].any?
    end

    def full_height?
      @full_height == true
    end

    protected

    def alpine_component
      "codeComponent"
    end
  end
end
