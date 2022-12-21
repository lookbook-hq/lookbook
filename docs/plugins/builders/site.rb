require_relative "../../../lib/lookbook/version"

class Builders::Site < SiteBuilder
  def build
    helper :lookbook_version do
      Lookbook::VERSION
    end

    helper :url_segment do |resource, pos = 1|
      resource.relative_url.split("/")[pos] if resource.present?
    end

    helper :guide_url, helpers_scope: true do |id|
      page_url(:user_docs, id)
    end

    helper :extend_url, helpers_scope: true do |id|
      page_url(:dev_docs, id)
    end

    helper :api_url, helpers_scope: true do |id|
      page_url(:api, id)
    end

    helper :page_url, helpers_scope: true do |collection_name, id|
      page = find_by_id(collection_name, id)
      page ? page.relative_url : "#"
    end

    helper :find_by_id do |collection_name, id|
      collection = site.collections[collection_name]
      collection&.resources&.find do |resource|
        normalize_id(resource.data&.id) == normalize_id(id)
      end
    end

    helper :dom_id do |*args|
      normalize_id(args.join("-"), kebab: true) if args.present?
    end

    helper :links, helpers_scope: true do
      site.data.links
    end

    helper :header_nav_links, helpers_scope: true do
      nav_collections = site.collections.select { _2.metadata[:header_nav] }
      nav_collections.map do |label, col|
        resource_ids = site.data[label].nav.groups.flat_map(&:items)
        index = col.resources.find { _1.data.id == resource_ids.first }
        {
          href: index.relative_url,
          label: col.metadata.title,
          active: (view.resource.collection.label == label)
        }
      end
    end

    helper :current_section, helpers_scope: true do
      collection = view.resource.collection
      if collection
        site.data[collection.label].nav.groups.each do |group|
          if group[:items].include?(view.resource.data.id)
            return group[:label]
          end
        end
      end
    end

    helper :markdown do |input = nil, &block|
      content = Bridgetown::Utils.reindent_for_markdown(
        block.nil? ? input.to_s : view.capture(&block)
      )
      converter = site.find_converter_instance(Bridgetown::Converters::Markdown)
      converter.convert(content).strip.html_safe
    end

    helper :add_toc_entry, helpers_scope: true do |entry|
      view.resource.data.toc.push(entry)
    end

    helper :api_module_url, helpers_scope: true do |klass|
      site_context = site || view.site
      collection = site_context&.collections&.api
      if collection
        subject = klass.underscore
        resource = collection.resources.find { |r| r.data.subject == subject }
        resource&.relative_url
      end
    end

    helper :api_module_data, helpers_scope: true do |klass|
      klass = klass.to_s.downcase.underscore.to_sym
      set = nil
      site.data.api.exported.each do |key, data|
        if data[klass].present?
          set = data[klass]
          break
        end
      end
      set&.symbolize_keys
    end

    helper :api_method_data, helpers_scope: true do |klass, method_name|
      method_name = method_name.to_s
      klass_data = api_module_data(klass)
      klass_data[:methods]&.find { |m| m[:name]&.to_s == method_name }&.symbolize_keys
    end
  end

  private

  def normalize_id(id, kebab: false)
    id = id.to_s.dasherize
    kebab ? id.tr("_", "-") : id.tr("-", "_")
  end
end
