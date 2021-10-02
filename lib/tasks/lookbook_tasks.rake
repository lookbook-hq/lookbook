require_relative "../lookbook"

namespace :lookbook do
  namespace :release do
    desc "Bump the Lookbook engine version number"
    task :bump_version, [:version] do |t, args|
      filename = Lookbook::Engine.root.join("lib/lookbook/version.rb")
      current_version = Lookbook::VERSION.to_s
      new_version = args[:version].sub("v", "").gsub("-",".")
      file = File.open(filename)
      contents = file.read
      File.write(filename, contents.gsub(current_version, new_version))
    end
  end
end
