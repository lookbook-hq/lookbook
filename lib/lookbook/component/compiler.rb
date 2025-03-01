require "concurrent-ruby"
require "ostruct"

module Lookbook
  module Component
    class Compiler
      def initialize(component_class)
        @component_class = component_class
        @redefinition_lock = Mutex.new
      end

      def compiled?
        CompileCache.compiled?(component_class)
      end

      def development?
        Rails.env.development? || Rails.env.test?
      end

      def compile(force: false)
        return if compiled? && !force
        return if component_class == Lookbook::Component::Base

        component_class.superclass.compile if should_compile_superclass?

        if template_path.present?
          redefinition_lock.synchronize do
            component_class.silence_redefinition_of_method("call")
            # rubocop:disable Style/EvalWithLocation
            component_class.class_eval <<-RUBY, template_path, 0
            def call
              #{compiled_template(template_path)}
            end
            RUBY
            # rubocop:enable Style/EvalWithLocation
          end
        end

        define_render_template_for

        CompileCache.register(component_class)
      end

      private

      attr_reader :component_class, :redefinition_lock

      def define_render_template_for
        redefinition_lock.synchronize do
          component_class.silence_redefinition_of_method(:render_template)
          component_class.class_eval <<-RUBY, __FILE__, __LINE__ + 1
        def render_template
          call
        end
          RUBY
        end
      end

      def template_path
        component_class.template_path
      end

      def compiled_template(file_path)
        handler = ActionView::Template.handler_for_extension(File.extname(file_path).delete("."))
        template = File.read(file_path)

        compile_template(template, handler)
      end

      def compile_template(template, handler)
        template.rstrip!

        if handler.method(:call).parameters.length > 1
          handler.call(component_class, template)
        else
          handler.call(
            OpenStruct.new(
              source: template,
              identifier: component_class.identifier,
              type: component_class.type
            )
          )
        end
      end

      def should_compile_superclass?
        development? && template_path.nil? &&
          !(
            component_class.instance_methods(false).include?(:call) ||
              component_class.private_instance_methods(false).include?(:call)
          )
      end
    end
  end
end
