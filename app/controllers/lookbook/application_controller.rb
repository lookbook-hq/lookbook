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

    def build_nav
      @nav = Collection.new
      previews.reject { |p| p.hidden? }.each do |preview|
        current = @nav
        if preview.hierarchy_depth == 1
          current.add(preview)
        else
          preview.lookbook_parent_collections.each.with_index(1) do |name, i|
            target = current.get_or_create(name)
            if preview.hierarchy_depth == i + 1
              target.add(preview)
            else
              current = target
            end
          end
        end
      end
      @nav
    end
  end
end
