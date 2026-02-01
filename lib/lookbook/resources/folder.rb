module Lookbook
  class Folder < ResourceNode
    permit_child_nodes Folder, Page, Spec

    def icon
      root? ? "layout-list" : "folder"
    end

    def url_path
      root? ? collection.url_path : super
    end
  end
end
