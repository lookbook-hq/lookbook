module Lookbook
  module AppHelper
    # Components

    def lb_tag(*args, **kwargs, &block)
      render Lookbook::UI::Tag.new(*args, **kwargs), &block
    end

    def lb_button(icon = nil, **kwargs)
      render Lookbook::UI::Button.new(icon: icon, **kwargs)
    end

    def lb_button_group(**kwargs, &block)
      render Lookbook::UI::ButtonGroup.new(**kwargs), &block
    end

    def lb_code(source = nil, lang: nil, **kwargs, &block)
      render Lookbook::UI::Code.new(source: source, lang: lang, **kwargs), &block
    end

    def lb_icon(name = nil, **kwargs)
      render Lookbook::UI::Icon.new(name: name, **kwargs)
    end

    def lb_page(page, **kwargs, &block)
      render Lookbook::UI::Page.new(page: page, **kwargs), &block
    end

    def lb_pane(id = nil, **kwargs, &block)
      render Lookbook::UI::Pane.new(id: id, **kwargs), &block
    end

    def lb_pane_group(id = nil, tag: :div, **kwargs, &block)
      render Lookbook::UI::PaneGroup.new(id: id, tag_name: tag, **kwargs), &block
    end

    def lb_panel(id = nil, **kwargs, &block)
      render Lookbook::UI::Panel.new(id: id, **kwargs), &block
    end

    def lb_prose(**kwargs, &block)
      render Lookbook::UI::Prose.new(**kwargs), &block
    end

    def lb_viewport(src, **kwargs)
      render Lookbook::UI::Viewport.new(src: src, **kwargs)
    end

    def lb_inspector_panel(type = :default, **kwargs, &block)
      component_types = Lookbook::UI::PreviewInspector::PANEL_COMPONENTS
      component = component_types[type.to_sym] || component_types[:default]

      render component.constantize.new(**kwargs), &block
    end

    # Paths

    def lookbook_page_path(page, **kwargs)
      lookbook.show_page_path(page, **kwargs)
    end

    def lookbook_preview_path(preview, target = nil, **kwargs)
      target.nil? ? lookbook.show_preview_path(preview, **kwargs) : lookbook.inspect_target_path(preview, target, **kwargs)
    end

    # Utilities

    def markdown(...)
      Markdown.render(...)
    end

    def code_comment(...)
      Languages.comment(...)
    end
  end
end
