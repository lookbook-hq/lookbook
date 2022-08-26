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

    helper :config_option_info, helpers_scope: true do |name, attrs = {}, &block|
      view.render Shared::ConfigOptionInfo.new(name: name, **attrs), &block
    end

    helper :method_info, helpers_scope: true do |name, attrs = {}, &block|
      view.render Shared::MethodInfo.new(name: name, **attrs), &block
    end

    helper :config_option_list, helpers_scope: true do |attrs = {}, &block|
      view.render Shared::ConfigOptionList.new(**attrs), &block
    end

    helper :method_list, helpers_scope: true do |attrs = {}, &block|
      view.render Shared::MethodList.new(**attrs), &block
    end

    helper :options_list, helpers_scope: true do |attrs = {}, &block|
      view.render Shared::OptionsList.new(**attrs), &block
    end

    helper :object_list, helpers_scope: true do |attrs = {}, &block|
      view.render Shared::ObjectList.new(**attrs), &block
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
