module Lookbook
  class PathPriorityPrefixesStripper < Service
    def initialize(path)
      @path = path
    end

    def call
      path = @path.to_s.downcase

      directory_path = File.dirname(path)
      directory_path = nil if directory_path.start_with?(".")

      file_name = File.basename(path).split(".").first

      segments = [*directory_path&.split("/"), file_name].compact
      segments.map! do |segment|
        PriorityPrefixParser.call(segment).last.tr("-", "_")
      end

      Utils.to_path(segments)
    end
  end
end
