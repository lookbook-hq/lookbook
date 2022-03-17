module Lookbook
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    helper Lookbook::ApplicationHelper

    before_action :build_nav

    def self.controller_path
      "lookbook"
    end

    protected

    def previews
      Lookbook::Preview.all.sort_by(&:label)
    end

    def pages
      Lookbook::Page.all.sort_by(&:position)
    end

    def build_nav
      @nav = {
        pages: nested_collection(pages),
        previews: nested_collection(previews)
      }
    end

    def nested_collection(items)
      collection = Collection.new
      items.reject { |i| i.hidden? }.each do |items|
        current = collection
        if items.hierarchy_depth == 1
          current.add(items)
        else
          items.parent_collections.each.with_index(1) do |name, i|
            target = current.get_or_create(name)
            if items.hierarchy_depth == i + 1
              target.add(items)
            else
              current = target
            end
          end
        end
      end
      collection
    end
  end
end
