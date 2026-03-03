module Lookbook
  module WithInertia
    extend ActiveSupport::Concern
    include Inertia::Controller

    included do
      layout "lookbook/application"

      inertia_config(
        prop_transformer: lambda do |props:|
          props = props.deep_transform_keys { _1.to_s.camelize(:lower) }
          props.deep_transform_values! { _1.try(:to_inertia) || _1 }
        end
      )

      rescue_from StandardError, with: :inertia_error_page
    end

    private def inertia_error_page(error = nil)
      if Lookbook.env.development?
        error error
        pd(error) if error
      end

      case error
      when ActionController::RoutingError
        render inertia: "errors/not_found", props: {status:}, status: :not_found
      else
        status = ActionDispatch::ExceptionWrapper.new(nil, error).status_code if error
        render inertia: "errors/error", props: {status:}, status:
      end
    end
  end
end
