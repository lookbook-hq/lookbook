module Booklet
  module Locatable
    extend ActiveSupport::Concern

    included do
      attr_reader :ctime

      prop :path, _Nilable(Pathname), reader: :public, writer: :protected do |value|
        Pathname(value.to_s) unless value.nil?
      end

      after_initialize do |node|
        self.path ||= Pathname(@ref)
        @ctime = path.ctime
      rescue Errno::ENOENT
        # Do nothing
      end

      alias_method :ref, :path
    end

    def dirty? = @ctime.before?(path.ctime)

    def locatable? = true

    class << self
      def entities = [FolderNode, AssetNode, PageNode, SpecNode, FileNode]

      def entity_from_path(path)
        stack = entities.reject { _1 == FileNode }

        entity = until stack.empty?
          begin
            entity = stack.shift.from(path)
            break entity if entity
          rescue ArgumentError
            # Do nothing
          end
        end

        entity || FileNode.from(path)
      end
    end
  end
end
