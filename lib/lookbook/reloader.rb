module Lookbook
  class Reloader
    def initialize(dirs, &block)
      @file_watcher = Engine.file_watcher.new([], dirs, &block)
    end

    def updated?
      @file_watcher.execute_if_updated
    end

    delegate :execute_if_updated, to: :@file_watcher
  end
end
