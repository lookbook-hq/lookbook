module Lookbook
  module ScenarioHelper
    def collate_source(rendered_scenarios)
      scenarios = Array.wrap(rendered_scenarios)
      if scenarios.many?
        fragments = scenarios.map { "#{sprintf _1.source_lang[:comment], _1.label}\n#{_1.source}".strip }
        fragments.join("\n\n")
      else
        scenarios.first.source
      end
    end

    def collate_output(rendered_scenarios)
      scenarios = Array.wrap(rendered_scenarios)
      if scenarios.many?
        scenarios.map { "<!-- #{_1.label} -->\n#{_1.output.strip}" }
      else
        scenarios.map(&:output).map(&:strip)
      end.join("\n\n")
    end

    def collate_notes(scenario)
      scenarios = scenario.is_a?(Lookbook::ScenarioGroupEntity) ? scenario.scenarios : [scenario]
      notes = scenarios.map(&:notes).join("\n\n")
      note_parts(notes)
    end

    # def notes?
    #   lines = notes.strip.split("\n")
    #   lines[0]&.strip&.start_with?("#")
    # end

    def note_parts(notes)
      note_lines = notes.split("\n")
      heading = nil
      if note_lines[0]&.strip&.start_with?("#")
        heading = note_lines.shift
      elsif note_lines[1]&.start_with?("---", "===")
        heading = note_lines.shift
        note_lines.shift
      end

      heading = heading&.gsub(/^(#+\s*)/, "")

      Note[heading, note_lines.join("\n").strip]
    end

    Note = Data.define(:heading, :body)
  end
end
