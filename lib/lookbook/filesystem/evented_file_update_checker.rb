require "active_support/evented_file_update_checker"

module Lookbook
  class EventedFileUpdateChecker < ActiveSupport::EventedFileUpdateChecker
    attr_reader :change_callbacks

    def initialize(files, dirs = {}, &block)
      unless block
        raise ArgumentError, "A block is required to initialize an EventedFileUpdateChecker"
      end

      @block = block
      @change_callbacks = []
      @core = Core.new(files, dirs, self)
      ObjectSpace.define_finalizer(self, @core.finalizer)
    end

    def on_change(&block)
      change_callbacks << block if block
    end

    class Core < ActiveSupport::EventedFileUpdateChecker::Core
      def initialize(files, dirs, checker)
        @checker = checker
        super(files, dirs)
      end

      def changed(modified, added, removed)
        super
        if @updated&.true?
          changeset = PathsChangeset.new(modified:, added:, removed:)
          @checker.change_callbacks.each { _1.call(changeset) }
        end
      end

      # Patched to handle regex-style
      # extension matchers like `.html.*`
      def watching?(file)
        return true if super

        file = Pathname(file)
        name_parts = file.basename.to_s.split(".")
        ext = "." + name_parts.drop(1).join(".").to_s

        file.dirname.ascend do |dir|
          matching = @dirs.fetch(dir, []).map { |m| Regexp.new(m) }
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
