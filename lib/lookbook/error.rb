module Lookbook
  class Error < StandardError
    delegate :full_message, :backtrace, :to_s, to: :target

    LINES_AROUND = 3

    def initialize(original = nil, title: nil, message: nil, file_path: nil, file_name: nil, line_number: nil, source_code: nil)
      @original = original
      @title = title
      @message = message
      @file_path = file_path
      @file_name = file_name
      @line_number = line_number
      @source_code = source_code
      super()
    end

    def source_code
      lines = source_code_lines

      if lines.present? && line_number.is_a?(Integer)
        start_line = source_code_start_line(lines)
        end_line = source_code_end_line(lines)
        highlighted_line = source_code_highlighted_line(lines)

        line_count = end_line - start_line
        relevant_lines = lines.slice(start_line - 1, line_count + 1)
        if relevant_lines.present?
          empty_start_lines = 0
          relevant_lines.each do |line|
            break unless line.strip.empty?
            empty_start_lines += 1
          end

          {
            code: relevant_lines.join("\n").lstrip,
            start_line: start_line - empty_start_lines,
            end_line: end_line - empty_start_lines,
            highlighted_line: highlighted_line - empty_start_lines
          }
        end

      end
    end

    def source_code_lines
      if file_path || @source_code
        if @source_code
          @source_code.split("\n")
        else
          full_path = Rails.root.join(file_path)
          File.read(full_path).split("\n") if File.exist? full_path
        end
      end
    end

    def file_lang
      lang = Lookbook::Lang.guess(file_path)
      lang.present? ? lang[:name] : "plaintext"
    end

    def title
      @title || target.class.to_s
    end

    def message
      (@message || target.message).gsub("(<unknown>):", "").strip.upcase_first
    end

    def file_name
      if @file_name == false
        nil
      else
        @file_name || file_path
      end
    end

    def file_path
      path = if @file_path.nil?
        parsed_backtrace[0][0] if parsed_backtrace.any?
      else
        @file_path.presence || nil
      end
      path.nil? ? nil : path.to_s.delete_prefix("#{Rails.root}/")
    end

    def line_number
      number = if @line_number.nil?
        parsed_backtrace[0][1] if parsed_backtrace.any?
      else
        @line_number.presence || nil
      end
      number.present? ? number.to_i : number
    end

    def parsed_backtrace
      backtrace.map do |x|
        x =~ /^(.+?):(\d+)(|:in `(.+)')$/
        [$1, $2, $4]
      end
    end

    protected

    def target
      @original.presence || self
    end

    def source_code_start_line(lines)
      [(line_number - LINES_AROUND), 1].max unless line_number.nil?
    end

    def source_code_end_line(lines)
      [line_number + LINES_AROUND, lines&.size || Infinity].min
    end

    def source_code_highlighted_line(lines)
      [line_number - source_code_start_line(lines) + 1, 1].max unless line_number.nil?
    end
  end
end
