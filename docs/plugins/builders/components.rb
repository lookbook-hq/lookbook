class Builders::Components < SiteBuilder
  def build
    helper :icon, helpers_scope: true do |name, attrs = {}|
      view.render LookbookDocs::Icon::Component.new name: name, **attrs
    end

    helper :image, helpers_scope: true do |path, attrs = {}|
      view.render LookbookDocs::Image::Component.new path: path, **attrs
    end

    helper :heading, helpers_scope: true do |text, id = nil, label: nil, level: 2, **attrs|
      id = dom_id(id || text.downcase.dasherize)

      add_toc_entry({
        label: label || text,
        id: id,
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

    helper :prose, helpers_scope: true do |title = nil, id = nil, **opts, &block|
      title_el = title ? heading(title, id, **opts.fetch(:heading, {})) : ""
      content = title_el + view.capture { block.call.strip_heredoc }
      view.render LookbookDocs::Prose::Component.new do
        content.html_safe
      end
    end

    helper :method_docs, helpers_scope: true do |klass, method_name, **opts|
      data = method_data(klass, method_name)
      if data
        view.render LookbookDocs::ApiMethod::Component.new(**data.symbolize_keys.merge(opts))
      end
    end

    helper :method_params_list, helpers_scope: true do |klass, method_name, **opts|
      data = method_data(klass, method_name)
      if data
        params = data[:tags].filter { |tag| tag[:tag_name].to_s == "param" }
        only_params = opts[:only].present? ? Array(opts[:only]) : nil
        params.select! { |param| param[:name].to_s.in?(only_params.map(&:to_s)) } unless only_params.nil?

        options = data[:tags].filter { |tag| tag[:tag_name].to_s == "option" }
        view.render LookbookDocs::ApiParamsList::Component.new(params: params, options: options, options_only: opts[:options_only])
      end
    end
  end
end
