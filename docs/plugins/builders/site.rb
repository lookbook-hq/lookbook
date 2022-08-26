require_relative "../../../lib/lookbook/version"

class Builders::Site < SiteBuilder
  def build
    helper :lookbook_version do
      Lookbook::VERSION
    end

    helper :url_segment, helpers_scope: true do |resource, pos = 1|
      if resource.present?
        resource.relative_url.split("/")[pos]
      end
    end

    helper :resource_from_url, helpers_scope: true do |url|
      collections.pages.resources.find { |r| r.relative_url == url }
    end

    helper :nav_next, helpers_scope: true do |url|
      site.data.nav.each do |name, groups|
        all_items = groups.map { |group| group["items"] }.flatten
        all_items.each_with_index do |item, i|
          if item[:url] == url && i < all_items.length - 1
            return all_items[i + 1]
          end
        end
      end
      nil
    end

    helper :nav_prev, helpers_scope: true do |url|
      site.data.nav.each do |name, groups|
        all_items = groups.map { |group| group["items"] }.flatten
        all_items.each_with_index do |item, i|
          if item[:url] == url && i > 0
            return all_items[i - 1]
          end
        end
      end
      nil
    end
  end
end
