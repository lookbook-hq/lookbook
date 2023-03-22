module Lookbook
  # Shared module that both Lookbook::Preview and ViewComponent::Preview are extended with
  module PreviewAfterRender
    def after_render(method:, html:)
      new.send(method, html).html_safe
    end
  end
end
