module Lookbook
  module SlotableConcern
    extend ActiveSupport::Concern

    included do
      def get_slot(name)
        slot_entries.find { _1.slot_name == name.to_sym }
      end

      def get_slots(name)
        slot_entries.select { _1.slot_name == name.to_sym }
      end

      def set_slot(slot_name, *args, **kwargs, &block)
        handler = self.class.registered_slots[slot_name.to_sym].bind(self)
        slot_entries << ComponentSlot.new(
          slot_name,
          handler,
          args: args,
          kwargs: kwargs,
          block: block,
          view_context: view_context.dup
        )
      end

      protected

      def slot_entries
        @slot_entries ||= []
      end
    end

    class_methods do
      def with_slot(slot_name, &block)
        slot_name = slot_name.to_s.singularize.to_sym

        method_name = :"_call_#{slot_name}"
        if block
          define_method method_name, &block
        else
          define_method method_name do |arg_content = nil, &block|
            arg_content || block
          end
        end

        registered_slots[slot_name] = instance_method(method_name)

        define_method :"with_#{slot_name}" do |*args, **kwargs, &block|
          set_slot(slot_name, *args, **kwargs, &block)
        end

        define_method slot_name do
          get_slot(slot_name)
        end

        define_method slot_name.to_s.pluralize.to_sym do
          get_slots(slot_name)
        end

        define_method :"#{slot_name}?" do
          get_slot(slot_name).present?
        end

        define_method :"#{slot_name.to_s.pluralize}?" do
          get_slots(slot_name).any?
        end
      end

      def registered_slots
        @registered_slots ||= {}
      end
    end
  end
end
