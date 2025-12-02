module Lookbook
  module ScenarioHelper
    def flatten_scenarios(target)
      if target.is_a?(ScenarioCollection)
        target.to_a
      elsif target.is_a?(ScenarioGroupEntity)
        target.scenarios
      else
        Array.wrap(target)
      end
    end

    def flatten_and_render(target)
      flatten_scenarios(target).map do |scenario|
        scenario.is_a?(RenderedScenarioEntity) ? scenario : render_scenario(scenario)
      end
    end

    def collate_source(scenarios)
      if scenarios.many?
        fragments = scenarios.map { "#{sprintf _1.source_lang[:comment], _1.label}\n#{_1.source}".strip }
        fragments.join("\n\n")
      else
        scenarios.first.source
      end
    end

    def collate_output(scenarios)
      if scenarios.many?
        scenarios.map { "<!-- #{_1.label} -->\n#{_1.output.strip}" }
      else
        scenarios.map(&:output).map(&:strip)
      end.join("\n\n")
    end

    def collate_notes(target)
      notes = Array.wrap(target).map(&:notes).join("\n\n")
      note_parts(notes)
    end

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
