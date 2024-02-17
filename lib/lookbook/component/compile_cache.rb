module Lookbook
  module Component
    module CompileCache
      mattr_accessor :cache, instance_reader: false, instance_accessor: false do
        Set.new
      end

      module_function

      def register(klass)
        cache << klass
      end

      def compiled?(klass)
        # cache.include? klass
        false
      end

      def invalidate_class!(klass)
        cache.delete(klass)
      end

      def invalidate!
        cache.clear
      end
    end
  end
end
