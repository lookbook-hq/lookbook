module Lookbook
  module ComponentsHelper
    def lookbook_app_layout(**kwargs, &block)
      render Lookbook::UI::App.new(**kwargs), &block
    end

    def lookbook_preview_inspector_layout(preview, target, **kwargs, &block)
      render Lookbook::UI::PreviewInspector.new(preview: preview, target: target, **kwargs), &block
    end

    def lookbook_preview_inspector_panel(type = :default, **kwargs, &block)
      component_types = Lookbook::UI::PreviewInspector::PANEL_COMPONENTS
      component = component_types[type.to_sym] || component_types[:default]

      render component.constantize.new(**kwargs), &block
    end

    def lookbook_preview_overview_layout(preview, targets = [], **kwargs, &block)
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

    def lookbook_nav_tree(id = nil, tree = nil, **kwargs, &block)
      render Lookbook::UI::NavTree.new(id: id, tree: tree, **kwargs), &block
    end

    def lookbook_nav_tree_item(node = nil, **kwargs, &block)
      render Lookbook::UI::NavTreeItem.new(node: node, **kwargs), &block
    end

    def lookbook_viewport(src, **kwargs)
      render Lookbook::UI::Viewport.new(src: src, **kwargs)
    end

    def lookbook_code(language = nil, **kwargs, &block)
      render Lookbook::UI::Code.new(language: language, **kwargs), &block
    end

    def lookbook_prose(**kwargs, &block)
      render Lookbook::UI::Prose.new(**kwargs), &block
    end
  end
end
