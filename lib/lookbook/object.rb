module Lookbook
  class Object < Literal::Object
    class_attribute :after_initialize_callbacks,
      instance_writer: false,
      instance_predicate: false,
      default: []

    def after_initialize
      after_initialize_callbacks.reverse_each { instance_exec(&_1) }
    end

    class << self
      def after_initialize(&callback)
        self.after_initialize_callbacks += [callback]
      end
    end
  end
end
