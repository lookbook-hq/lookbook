module Booklet
  class SpecNode < Node
    include Locatable
    include Nameable
    include Hideable
    include AcceptsParams
    include AcceptsDisplayOptions

    # prop :notes, _Nilable(TextSnippet), reader: :public, writer: :public

    permit_child_nodes ScenarioNode, TextNode

    def notes = children.grep(TextNode)&.first

    def scenarios = children.grep(ScenarioNode)

    def format
      case path.to_s
      when /.*(_preview\.rb)$/
        :preview_class
      when /.*(_booklet\.rb)$/
        :booklet_spec
      end
    end

    class << self
      def from(path, **props)
        unless /(_preview\.rb|_booklet\.rb)$/.match?(path.to_s)
          raise ArgumentError, "#{path} is not a valid spec file"
        end

        name = FileHelpers.file_name(path)
          .gsub("_preview", "")
          .gsub("_booklet", "")
          .gsub("_component", "")
        new(path:, name:, **props)
      end
    end
  end
end
