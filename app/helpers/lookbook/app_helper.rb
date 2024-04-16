module Lookbook
  module AppHelper
    # Components
    #
    def lookbook_tag(*args, **kwargs, &block)
      render Lookbook::UI::Tag.new(*args, **kwargs), &block
    end

    def lookbook_router(events_endpoint = nil, **kwargs, &block)
      render Lookbook::UI::Router.new(events_endpoint: events_endpoint, **kwargs), &block
    end

    def lookbook_layout(id = nil, tag: :div, **kwargs, &block)
      render Lookbook::UI::Layout.new(id: id, tag_name: tag, **kwargs), &block
    end

    def lookbook_pane(id = nil, **kwargs, &block)
      render Lookbook::UI::Pane.new(id: id, **kwargs), &block
    end

    def lookbook_app(**kwargs, &block)
      render Lookbook::UI::App.new(**kwargs), &block
    end

    def lookbook_icon(name = nil, **kwargs)
      render Lookbook::UI::Icon.new(name: name, **kwargs)
    end

    def lookbook_button(icon = nil, **kwargs)
      render Lookbook::UI::Button.new(icon: icon, **kwargs)
    end

    def lookbook_button_group(**kwargs, &block)
      render Lookbook::UI::ButtonGroup.new(**kwargs), &block
    end

    def lookbook_inspector_panel(type = :default, **kwargs, &block)
      component_types = Lookbook::UI::PreviewInspector::PANEL_COMPONENTS
      component = component_types[type.to_sym] || component_types[:default]

      render component.constantize.new(**kwargs), &block
    end

    def lookbook_panel(id = nil, **kwargs, &block)
      render Lookbook::UI::Panel.new(id: id, **kwargs), &block
    end

    ## --------------

    def lookbook_preview_inspector(preview, target, **kwargs, &block)
      render Lookbook::UI::PreviewInspector.new(preview: preview, target: target, **kwargs), &block
    end

    def lookbook_preview_overview(preview, targets = [], **kwargs, &block)
      render Lookbook::UI::PreviewOverview.new(preview: preview, targets: targets, **kwargs), &block
    end

    def lookbook_viewport(src, **kwargs)
      render Lookbook::UI::Viewport.new(src: src, **kwargs)
    end

    def lookbook_page_reader(src = nil, **kwargs, &block)
      render Lookbook::UI::Reader.new(src: src, **kwargs), &block
    end

    # Other

    def markdown(...)
      Markdown.render(...)
    end

    def code_comment(...)
      Languages.comment(...)
    end
  end
end
