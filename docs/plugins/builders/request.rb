class Builders::Request < SiteBuilder
  def build
    helper :url_segment, helpers_scope: true do |resource, pos = 1|
      if resource.present?
        resource.relative_url.split('/')[pos]
      else
        nil
      end
    end
  end
end