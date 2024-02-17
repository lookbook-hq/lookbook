require "action_view"

module Lookbook
  module Component
    class Base < ActionView::Base
      attr_accessor :original_view_context

      def set_original_view_context(view_context)
        self.original_view_context = view_context
      end

      def render_in(view_context, &block)
        self.class.compile

        @view_context = view_context
        self.original_view_context ||= view_context

        @output_buffer = ActionView::OutputBuffer.new
        @lookup_context ||= view_context.lookup_context
        @view_flow ||= view_context.view_flow

        @current_template = nil unless defined?(@current_template)
        old_current_template = @current_template
        @current_template = self

        @_content_evaluated = false
        @_render_in_block = block

        before_render

        render? ? render_template.to_s : ""
      ensure
        @current_template = old_current_template
      end

      def before_render
      end

      def render?
        true
      end

      def initialize(*)
      end

      def call
        raise "Components must define a call method or provide a template file."
      end

      def render(options = {}, args = {}, &block)
        if options.respond_to?(:set_original_view_context)
          options.set_original_view_context(original_view_context)
          super
        else
          original_view_context.render(options, args, &block)
        end
      end

      def controller
        @_controller ||= view_context.controller
      end

      def helpers
        @_helpers ||= original_view_context || controller.view_context
      end

      def virtual_path
        self.class.virtual_path
      end

      def content
        @_content_evaluated = true
        return @_content if defined?(@_content)

        @_content = render_in_block_provided? ? view_context.capture(self, &@_render_in_block) : ""
      end

      def content?
        render_in_block_provided?
      end

      private

      attr_reader :view_context

      def render_in_block_provided?
        @view_context && @_render_in_block
      end

      def content_evaluated?
        @_content_evaluated
      end

      def is_singular?(str)
        str.pluralize.singularize == str
      end

      def get_slot(name)
        content unless content_evaluated?

        @_set_slots ||= []
        slot = @_set_slots.find { |s| s[:name].to_sym == name.to_sym }
        slot[:content] if slot
      end

      def get_slots(name)
        content unless content_evaluated?

        @_set_slots ||= []
        slots = @_set_slots.select { |s| s[:name].to_sym == name.to_sym }
        slots.map { |s| s[:content] }
      end

      def set_slot(name, *args, &block)
        handler = self.class.registered_slots[name.to_sym]
        result = if handler.respond_to?(:method_defined?) && handler.method_defined?(:render_in)
          # component class
          handler.new(*args)
        else
          renderable_function = handler.bind(self)
          if block
            renderable_function.call(*args) do |*rargs|
              view_context.capture(*rargs, &block)
            end
          else
            renderable_function.call(*args)
          end
        end

        # if the result is a component, render it
        result = if result.respond_to?(:render_in)
          if view_context
            view_context.render result, &block
          else
            render result, &block
          end
        else
          result
        end

        @_set_slots ||= []
        @_set_slots << {
          name: name.to_sym,
          content: result.is_a?(String) ? result.html_safe : nil
        }

        nil
      end
      ruby2_keywords(:set_slot) if respond_to?(:ruby2_keywords, true)

      def method_missing(method, ...)
        if view_context && helpers.respond_to?(method.to_sym)
          helpers.send(method.to_sym, ...)
        else
          super
        end
      end

      def respond_to_missing?(method, include_private = false)
        (view_context && helpers.respond_to?(method.to_sym, include_private)) || super
      end

      class << self
        attr_accessor :source_location, :virtual_path

        def template_path
          return unless source_location
          @_tmpl_path ||= begin
            component_name = name.demodulize.underscore
            directory = File.dirname(source_location)

            file_path = File.join(directory, "#{component_name}.html.erb")
            file_path if File.exist?(file_path)
          end
        end

        def inherited(child)
          compile

          if !child.instance_methods(false).include?(:render_template) && !child.compiled?
            child.class_eval <<~RUBY, __FILE__, __LINE__ + 1
              def render_template
                self.class.compile(force: true)
                render_template
              end
            RUBY
          end

          if defined?(Rails) && Rails.application && !(child < Rails.application.routes.url_helpers)
            child.include Rails.application.routes.url_helpers
          end

          child.source_location = caller_locations(1, 10).reject { |l| l.label == "inherited" }[0].path
          child.virtual_path = child.source_location.gsub(/(\.rb)/, "")

          super
        end

        def compiled?
          compiler.compiled?
        end

        def compile(force: false)
          compiler.compile(force: force)
        end

        def compiler
          @_compiler ||= Compiler.new(self)
        end

        def type
          "text/html"
        end

        def identifier
          source_location
        end

        def registered_slots
          @_registered_slots ||= {}
        end

        def with_slot(slot_name, handler = nil, &block)
          slot_name = slot_name.to_s.singularize.to_sym

          if handler
            registered_slots[slot_name.to_sym] = if handler.respond_to?(:method_defined?) && handler.method_defined?(:render_in)
              handler
            else
              instance_method(handler)
            end
          elsif block
            method_name = :"_call_#{slot_name}"
            define_method method_name, &block
            registered_slots[slot_name.to_sym] = instance_method(method_name)
          else
            method_name = :"_call_#{slot_name}"
            define_method method_name do |&block|
              view_context.capture(&block)
            end
            registered_slots[slot_name.to_sym] = instance_method(method_name)
          end

          define_method :"with_#{slot_name}" do |*args, &block|
            set_slot(slot_name, *args, &block)
          end
          ruby2_keywords(:"with_#{slot_name}") if respond_to?(:ruby2_keywords, true)

          define_method slot_name do |*args, &block|
            get_slot(slot_name)
          end
          ruby2_keywords(slot_name.to_sym) if respond_to?(:ruby2_keywords, true)

          define_method slot_name.to_s.pluralize.to_sym do |*args, &block|
            get_slots(slot_name)
          end
          ruby2_keywords(slot_name.to_s.pluralize.to_sym) if respond_to?(:ruby2_keywords, true)

          define_method "#{slot_name}?" do
            get_slot(slot_name).present?
          end

          define_method "#{slot_name.to_s.pluralize}?" do
            get_slots(slot_name).any?
          end
        end
      end
    end
  end
end
