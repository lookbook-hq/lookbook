# frozen_string_literal: true

require "net/http"
require "json"

module Lookbook
  module Inertia
    class Renderer
      def initialize(component, controller, request, response, render_method, **options)
        @controller = controller
        @configuration = controller.__send__(:inertia_configuration)
        @request = request
        @response = response
        @render_method = render_method

        passed_props = options.fetch(:props, component.is_a?(Hash) ? component : {})
        @props = shared_data.symbolize_keys.merge(passed_props.symbolize_keys)

        @component = resolve_component(component)

        @controller.instance_variable_set(:@_inertia_rendering, true)
      end

      def render
        @response.headers["Vary"] = if @response.headers["Vary"].blank?
          "X-Inertia"
        else
          "#{@response.headers["Vary"]}, X-Inertia"
        end
        if @request.inertia?
          @response.set_header("X-Inertia", "true")
          @render_method.call json: page.to_json, status: @response.status, content_type: Mime[:json]
        else
          @controller.instance_variable_set(:@_inertia_page, page)
          @render_method.call template: "lookbook/inertia", locals: {page: page}
        end
      end

      private

      def shared_data
        @controller.__send__(:inertia_shared_data)
      end

      def computed_props
        @props
          .tap do |merged_props|
            # Always keep errors in the props
            if merged_props.key?(:errors) && !merged_props[:errors].is_a?(BaseProp)
              errors = merged_props[:errors]
              merged_props[:errors] = Inertia.always { errors }
            end
          end
          .then { |props| deep_transform_props(props) }
          .then { |props| @configuration.prop_transformer(props: props) }
      end

      def page
        return @page if defined?(@page)

        @page = {
          component: @component,
          props: computed_props,
          url: @request.original_fullpath,
          version: @configuration.version
        }

        once_props = resolve_once_props
        @page[:onceProps] = once_props if once_props.present?

        @page
      end

      def deep_transform_props(props, parent_path = [])
        props.each_with_object({}) do |(key, prop), transformed_props|
          current_path = parent_path + [key]

          if prop.is_a?(Hash) && prop.any?
            nested = deep_transform_props(prop, current_path)
            transformed_props[key] = nested unless nested.empty?
          elsif keep_prop?(prop, current_path)
            transformed_props[key] =
              case prop
              when BaseProp
                prop.call(@controller)
              when Proc
                @controller.instance_exec(&prop)
              else
                prop
              end
          end
        end
      end

      def resolve_once_props
        @props.each_with_object({}) do |(key, prop), result|
          next unless prop.try(:once?)
          next if excluded_by_partial_request?([key.to_s])

          once_key = (prop.once_key || key).to_s

          result[once_key] = {prop: key.to_s, expiresAt: prop.expires_at}.compact
        end
      end

      def partial_keys
        @partial_keys ||= (@request.headers["X-Inertia-Partial-Data"] || "").split(",").compact_blank!
      end

      def partial_except_keys
        @partial_except_keys ||= (@request.headers["X-Inertia-Partial-Except"] || "").split(",").compact_blank!
      end

      def except_once_keys
        @except_once_keys ||= (@request.headers["X-Inertia-Except-Once-Props"] || "").split(",").compact_blank!
      end

      def rendering_partial_component?
        @request.headers["X-Inertia-Partial-Component"] == @component
      end

      def resolve_component(component)
        if component == true || component.is_a?(Hash)
          @configuration.component_path_resolver(path: @controller.controller_path, action: @controller.action_name)
        else
          component
        end
      end

      def keep_prop?(prop, path)
        return false if excluded_by_once_cache?(prop, path)
        return false if excluded_by_partial_request?(path)

        true
      end

      def excluded_by_once_cache?(prop, path)
        return false unless prop.try(:once?)
        return false if prop.try(:fresh?)
        return false if explicitly_requested?(path)

        once_key = (prop.once_key || path.join(".")).to_s
        except_once_keys.include?(once_key)
      end

      def explicitly_requested?(path)
        return false unless rendering_partial_component? && partial_keys.present?

        path_with_prefixes = path_prefixes(path)
        (path_with_prefixes & partial_keys).any?
      end

      def excluded_by_partial_request?(path)
        return false unless rendering_partial_component? && (partial_keys.present? || partial_except_keys.present?)

        path_with_prefixes = path_prefixes(path)
        excluded_by_only_partial_keys?(path_with_prefixes) || excluded_by_except_partial_keys?(path_with_prefixes)
      end

      def path_prefixes(parts)
        (0...parts.length).map do |i|
          parts[0..i].join(".")
        end
      end

      def excluded_by_only_partial_keys?(path_with_prefixes)
        partial_keys.present? && (path_with_prefixes & partial_keys).empty?
      end

      def excluded_by_except_partial_keys?(path_with_prefixes)
        partial_except_keys.present? && (path_with_prefixes & partial_except_keys).any?
      end
    end
  end
end
