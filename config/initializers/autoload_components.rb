components_dir = "#{Lookbook::Engine.root}/app/components/lookbook"

Rails.application.autoloaders.main.collapse("#{components_dir}/concerns")
Rails.application.autoloaders.main.collapse("#{components_dir}/ui/*")
Rails.application.autoloaders.main.collapse("#{components_dir}/ui/*/*")
Rails.application.autoloaders.main.collapse("#{components_dir}/ui/*/*/*")
Rails.application.autoloaders.main.collapse("#{components_dir}/ui/*/*/*/*")

Rails.application.config.to_prepare do
  Rails.application.autoloaders.main.eager_load_dir(components_dir)
end
