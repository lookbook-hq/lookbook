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
    end
  end
end
