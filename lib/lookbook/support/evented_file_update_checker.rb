require "active_support"

module Lookbook
  class EventedFileUpdateChecker < ActiveSupport::EventedFileUpdateChecker
    def initialize(files, dirs = {}, &block)
      super
      @core = Core.new(files, dirs)
    end

    class Core < ActiveSupport::EventedFileUpdateChecker::Core
      def changed(modified, added, removed)
        super
        Engine.files_changed(modified, added, removed) if @updated
      end

      # Patched to handle regex-style
      # extension matchers like `.html.*`
      def watching?(file)
        return true if super

        file = Pathname(file)
        name_parts = file.basename.to_s.split(".")
        ext = "." + name_parts.drop(1).join(".").to_s

        file.dirname.ascend do |dir|
          matching = @dirs.fetch(dir, []).map { |m|
            p "))))))))))))) #{m}"
            Regexp.new(m)
          }
          if matching.empty? || matching.find { |m| m.match?(ext) }
            break true
          elsif dir == @common_path || dir.root?
            break false
          end
        end
      end
    end
  end
end
