module Lookbook
  module AppHelper
    # Components

    def lookbook_router(events_endpoint = nil, **kwargs, &block)
      render Lookbook::UI::Router.new(events_endpoint: events_endpoint, **kwargs), &block
    end

    def lookbook_app(**kwargs, &block)
      render Lookbook::UI::App.new(**kwargs), &block
    end

    def lookbook_preview_inspector(preview, target, **kwargs, &block)
      render Lookbook::UI::PreviewInspector.new(preview: preview, target: target, **kwargs), &block
    end

    def lookbook_inspector_panel(type = :default, **kwargs, &block)
      component_types = Lookbook::UI::PreviewInspector::PANEL_COMPONENTS
      component = component_types[type.to_sym] || component_types[:default]

      render component.constantize.new(**kwargs), &block
    end

    def lookbook_preview_overview(preview, targets = [], **kwargs, &block)
      render Lookbook::UI::PreviewOverview.new(preview: preview, targets: targets, **kwargs), &block
    end

    def lookbook_tab_group(id = nil, **kwargs, &block)
      render Lookbook::UI::TabGroup.new(id: id, **kwargs), &block
    end

    def lookbook_tabbed_pane(id = nil, **kwargs, &block)
      render Lookbook::UI::TabbedPane.new(id: id, **kwargs), &block
    end

    def lookbook_pane(id = nil, **kwargs, &block)
      render Lookbook::UI::Pane.new(id: id, **kwargs), &block
    end

    def lookbook_panel(id = nil, **kwargs, &block)
      render Lookbook::UI::Panel.new(id: id, **kwargs), &block
    end

    def lookbook_nav_tree(id = nil, tree = nil, **kwargs, &block)
      render Lookbook::UI::NavTree.new(id: id, tree: tree, **kwargs), &block
    end

    def lookbook_nav_tree_item(node = nil, **kwargs, &block)
      render Lookbook::UI::NavTreeItem.new(node: node, **kwargs), &block
    end

    def lookbook_nav_tree_filter(**kwargs, &block)
      render Lookbook::UI::NavTreeFilter.new(**kwargs), &block
    end

    def lookbook_viewport(src, **kwargs)
      render Lookbook::UI::Viewport.new(src: src, **kwargs)
    end

    def lookbook_page_reader(src = nil, **kwargs, &block)
      render Lookbook::UI::Reader.new(src: src, **kwargs), &block
    end

    def lookbook_status_bar_item(**kwargs, &block)
      render Lookbook::UI::StatusBarItem.new(**kwargs), &block
    end

    def lookbook_icon_button(icon = nil, **kwargs, &block)
      render Lookbook::UI::IconButton.new(icon: icon, **kwargs), &block
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
