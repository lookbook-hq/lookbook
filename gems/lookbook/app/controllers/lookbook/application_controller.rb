module Lookbook
  class NotFoundError < ActionController::RoutingError; end

  class ApplicationController < ActionController::Base
    include ActionView::Helpers::OutputSafetyHelper
    include Unannotatable
    include WithInertia
    include Loggable

    content_security_policy(false) if respond_to?(:content_security_policy)
    protect_from_forgery with: :exception

    helper_method :asset_tags

    inertia_share do
      {
        lookbook: {
          urlPath: lookbook_path,
          version: Lookbook::VERSION
        },
        project: Lookbook.config.project,
        collections: Inertia.once(fresh: refresh_request?) { Collection.map(&:to_inertia) },
        collection_id: @collection&.id,
        request: {
          url: request.url
        }
      }
    end

    private def asset_tags
      @asset_tags ||= safe_join(Assets.asset_tags)
    end

    private def refresh_request?
      request.headers["HTTP_X_LOOKBOOK_REFRESH"].present?
    end
  end
end
