class Builders::Components < SiteBuilder
  def build
    helper :icon, helpers_scope: true do |name, attrs = {}|
      view.render LookbookDocs::Icon::Component.new name: name, **attrs
    end

    helper :image, helpers_scope: true do |path, attrs = {}|
      view.render LookbookDocs::Image::Component.new path: path, **attrs
    end

    helper :heading, helpers_scope: true do |text, id, label: nil, level: 2, **attrs|
      add_toc_entry({
        label: label || text,
        id: id ? dom_id(id) : nil,
        level: level
      })

      view.render(LookbookDocs::Heading::Component.new(id: id, level: level, **attrs)) do
        text
      end
    end

    helper :link_list, helpers_scope: true do |*links, **attrs|
      view.render LookbookDocs::LinkList::Component.new(links: links, **attrs)
    end

    helper :note, helpers_scope: true do |theme = :info, attrs = {}, &block|
      view.render LookbookDocs::Note::Component.new(theme: theme, **attrs), &block
    end

    helper :lede, helpers_scope: true do |&block|
      view.render LookbookDocs::Lede::Component.new, &block
    end
  end
end
