# frozen_string_literal: true

require "yard"
require "logger"

module Booklet
  module YARD
    class Parser < Booklet::Object
      prop :log_level, Integer, default: Logger::ERROR.freeze

      after_initialize do
        @parsing = Monitor.new
        @yard = ::YARD
        @yard_logger = ::YARD::Logger.instance
      end

      def parse(*path_sets)
        @parsing.synchronize do
          @yard::Registry.clear

          paths = Array.wrap(path_sets).flatten.map(&:to_s)

          @yard_logger.enter_level(@log_level) { @yard.parse(paths) }

          @yard::Registry.all(:class).filter do |code_object|
            paths.include?(code_object.file)
          end
        end
      end

      def parse_file(path)
        parse(path).first
      end

      class << self
        def define_tags(tags)
          tags = tags.map { _1.is_a?(String) ? _1.constantize : _1 }
          tags.each do |tag|
            ::YARD::Tags::Library.define_tag(tag.label, tag.tag_name, tag)
          end
        end
      end
    end
  end
end
