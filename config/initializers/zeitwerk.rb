Rails.autoloaders.each do |autoloader|
  autoloader.inflector = Lookbook::Inflector.new
end
