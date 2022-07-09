class Builders::Components < SiteBuilder
  def build
    helper :icon, helpers_scope: true do |name, attrs = {}|
      view.render Shared::Icon.new name: name, **attrs
    end

    helper :note, helpers_scope: true do |theme = :info, attrs = {}, &block|
      view.render Shared::Note.new(theme: theme, **attrs), &block
    end

    helper :image, helpers_scope: true do |path, attrs = {}|
      view.render Shared::Image.new path: path, **attrs
    end

    helper :config_option, helpers_scope: true do |name, attrs = {}, &block|
      view.render Shared::ConfigOption.new(name: name, **attrs), &block
    end

    helper "toc", :toc_template
  end

  def toc_template(*)
    <<~MD
      * ...
      {:toc}
    MD
  end
end