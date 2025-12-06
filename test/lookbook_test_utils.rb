module LookbookTestUtils
  extend ActiveSupport::Concern

  included do
    include Rails.application.routes.url_helpers
    include Lookbook::Engine.routes.url_helpers
  end

  class_methods do
  end
end
