module Lookbook
  module Component
    class OptionsGroup
      include OptionItem

      attr_accessor :shorthand
      attr_reader :name, :items

      def initialize(name, shorthand: nil, **kwargs)
        @name = name.to_sym
        @shorthand = shorthand&.to_sym
        @alias = kwargs.fetch(:alias, nil)
        @private = kwargs.fetch(:private, false)
        @items = []
      end

      def accepts_option(...)
        if block_given?
          subgroup = OptionsGroup.new(...)
          yield subgroup
          add_group(subgroup)
        else
          add_option(...)
        end
      end

      def add_option(...)
        items << Option.new(...)
      end

      def add_group(...)
        items << OptionsGroup.new(...)
      end

      # Like #dig... but for options.
      #
      # get_option(:size)
      # get_option(:dropdown, :placement)
      def get_option(*args)
        option_name = args.pop.to_sym
        group = get_group(*args)
        group.items.find { _1.name == option_name && _1.is_a?(Option) }
      end

      def get_option!(*args)
        get_option(*args) || raise("Unknown option: `#{args.join(", ")}`")
      end

      def option?(...)
        !!get_option(...)
      end

      def get_option_value(...)
        get_option!(...).value
      end

      def set_option_value(*args, value)
        if option?(*args)
          get_option(*args).value = value
        elsif group?(*args)
          group = get_group(*args)
          if group.shorthand
            group.set_option_value(group.shorthand, value)
          end
        end
      end

      def option_value_equals?(*args, check)
        get_option_value(*args) == check
      end

      def merge_option_values(*args, values, overwrite: true)
        get_group!(*args).items.each do |item|
          if values.key?(item.name)
            value = values[item.name]
            if item.is_a?(Option)
              item.value = value if overwrite || item.undefined?
            elsif value.is_a?(Hash) || item.shorthand
              value = value.is_a?(Hash) ? value : [[item.shorthand, value]].to_h
              item.merge_option_values(value, overwrite: overwrite)
            end
          end
        end
      end

      # Like #dig... but for groups.
      def get_group(*args)
        current = args.any? ? nil : self
        args.each do |group_name|
          next_group = (current || self).groups.find { _1.name == group_name.to_sym }
          current = next_group || break
        end
        current
      end

      def get_group!(*args)
        get_group(*args) || raise("Unknown group: `#{args.join(", ")}`")
      end

      def group?(...)
        !!get_group(...)
      end

      def validate_required!
        items.map(&:validate_required!)
      end

      def option_names
        items.map(&:name)
      end

      def values
        items.map do |item|
          [item.name, item.is_a?(Option) ? item.value : item.values]
        end.to_h
      end

      def public_items
        items.filter(&:public?)
      end

      def flattened_attribute_values(key_prefix = nil)
        public_items.each_with_object([]) do |item, values|
          key = [key_prefix, item.html_alias].compact.join("-")
          if item.is_a?(Option)
            item.value.nil? ? values : values.push([key, item.value])
          else
            values.push(*item.flattened_attribute_values(key).to_a)
          end
        end.to_h
      end

      def clone
        Marshal.load(Marshal.dump(self))
      end

      protected

      # All options in this group.
      # Does not include options in subgroups.
      def options
        items.filter { _1.is_a?(Option) }
      end

      # All groups in this group
      # Does not include groups in subgroups.
      def groups
        items.filter { _1.is_a?(Group) }
      end
    end
  end
end
