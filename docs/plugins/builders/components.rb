class Builders::Components < SiteBuilder
  def build
    helper :icon, helpers_scope: true do |name|
      view.render Shared::Icon.new name: name
    end

    helper :note, helpers_scope: true do |opts = {}, &block|
      view.render Shared::Note.new(type: opts[:type] || :info), &block
    end
  end
end