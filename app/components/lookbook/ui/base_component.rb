module Lookbook
  module UI
    class BaseComponent < Lookbook::Component::Base
      include ActionView::Helpers::TagHelper

      TAG_ATTRIBUTE_NAMES = %i[id class data aria style key x].freeze

      def component_name
        @_component_name ||= self.class.send(:component_name)
      end

      def tag_attrs
        @_tag_attrs ||= {}
      end

      def accepts_options?
        self.class.respond_to?(:accepts_option)
      end

      protected

      def args
        @_args ||= {}
      end

      def args=(new_args)
        @_args = new_args
      end

      def component_args
        @_component_args ||= {**args}
      end

      def tag_name(name = nil)
        @tag_name = name if name
        @tag_name ||= self.class.tag_name
      end

      attr_writer :tag_name

      def set_tag_attr(attr_name, value = "")
        tag_attrs[attr_name] = value
      end

      def set_tag_data_attr(attr_name, value = "")
        tag_attrs[:data] ||= {}
        tag_attrs[:data][attr_name] = value
      end

      def tag_attr?(attr_name)
        tag_attrs.key?(attr_name)
      end

      def call
        component_tag(tag_name) do
          content
        end
      end

      def before_render
        content unless content_evaluated?

        tag_attrs[:data] ||= {}
        tag_attrs[:data]["component"] = component_name

        self.class.send(:run_callbacks, :before_render, nil, context: self)

        if accepts_options?
          accepted_options.validate_required!
          accepted_options.flattened_attribute_values.each { tag_attrs[:data][_1] = _2 }
        end

        tag_attrs.compact!
      end

      def component_tag(tag_override = nil, **attrs)
        merged_attrs = attrs.deep_merge(tag_attrs)
        classes = class_names(attrs[:class], tag_attrs[:class])
        merged_attrs[:class] = classes if classes.present?
        Lookbook::UI::Tag.new(tag_override || tag_name || :div, **merged_attrs, root: true)
      end

      private

      def process_tag_attrs(args)
        @_tag_attrs ||= {}
        @_tag_attrs.merge!(args[:html].to_h)
        @_tag_attrs.merge!(args.slice(*self.class.tag_attr_names))
        @_component_args = args.except(*self.class.tag_attr_names, :html)
      end

      class << self
        def new(**kwargs)
          kwargs = run_callbacks(:before_initialize, kwargs, reduce: true)

          obj = super(**kwargs)

          if obj.instance_of?(Lookbook::Component::Base)
            raise "`Lookbook::Component::Base` must be subclassed before use"
          end

          obj.instance_variable_set(:@_args, kwargs)
          obj.send(:process_tag_attrs, kwargs)
          obj.send(:merge_option_values, kwargs) if obj.accepts_options?
          obj.class.send(:run_callbacks, :after_initialize, {}, context: obj) && obj
        end

        def tag_name(name = nil)
          @_tag_name = name if name
          @_tag_name
        end

        def tag_attr(*attr_names)
          tag_attr_names.push(*attr_names)
        end

        def tag_attr_names
          @_tag_attr_names ||= [*TAG_ATTRIBUTE_NAMES]
        end

        def before_render(method_name = nil, &callback)
          callbacks[:before_render].push(method_name || callback)
        end

        def before_initialize(method_name = nil, &callback)
          callbacks[:before_initialize].push(method_name || callback)
        end

        def after_initialize(method_name = nil, &callback)
          callbacks[:after_initialize].push(method_name || callback)
        end

        def component_name(name = nil)
          if name
            @_component_name = name.to_s.tr("_", "-")
          else
            @_component_name ||= component_path.demodulize.underscore.tr("_", "-")
          end
        end

        private

        def component_path
          name.to_s.delete_prefix("Lookbook::")
        end

        def run_callbacks(type, args, context: self, reduce: false)
          callbacks[type].inject(args) do |memo, cb|
            result = cb.is_a?(Symbol) ? context.send(cb, memo) : context.instance_exec(memo, &cb)
            (reduce && result.is_a?(Hash) && args.is_a?(Hash)) ? result : memo
          end
        end

        def callbacks
          @_callbacks ||= {
            before_render: [],
            before_initialize: [],
            after_initialize: []
          }
        end
      end
    end
  end
end
