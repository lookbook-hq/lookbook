class Builders::Components < SiteBuilder
  def build
    helper :icon, helpers_scope: true do |name, attrs = {}|
      view.render LookbookDocs::Icon::Component.new name: name, **attrs
    end

    helper :button, helpers_scope: true do |text, href = nil, attrs = {}|
      view.render LookbookDocs::Button::Component.new text: text, href: href, **attrs
    end

    helper :image, helpers_scope: true do |path, attrs = {}|
      view.render LookbookDocs::Image::Component.new path: path, **attrs
    end

    helper :screenshot, helpers_scope: true do |src, title = nil, attrs = {}|
      view.render LookbookDocs::Screenshot::Component.new src: src, **attrs
    end

    helper :section, helpers_scope: true do |title = nil, **opts|
      LookbookDocs::Section::Component.new(toc: view.resource.data.toc, title: title, **opts)
    end

    helper :code, helpers_scope: true do |lang = :html, **opts, &block|
      view.render LookbookDocs::Code::Component.new(lang: lang, **opts), &block
    end
  end
end
