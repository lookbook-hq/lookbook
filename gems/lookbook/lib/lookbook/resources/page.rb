module Lookbook
  class Page < ResourceNode
    def icon = "file-text"

    def url_path = page_path(self)

    alias_method :href, :url_path

    def call(**locals)
      view_context = ViewContext.for(:pages)
      @entity.call(view_context, **locals)&.html_safe
    end

    private def locals
      {
        page: {data: @entity.data}
      }
    end
  end
end
