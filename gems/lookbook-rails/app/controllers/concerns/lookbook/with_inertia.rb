module Lookbook
  module WithInertia
    extend ActiveSupport::Concern
    include Lookbook::Rails
    include Inertia::Controller

    included do
      layout "lookbook/application"

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
