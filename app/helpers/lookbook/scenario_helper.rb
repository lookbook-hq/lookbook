module Lookbook
  module ScenarioHelper
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
  end
end
