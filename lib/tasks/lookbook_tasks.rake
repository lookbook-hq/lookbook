require_relative "../lookbook"

namespace :lookbook do
  desc "Run the rspec tests"
  task :test do
    sh "bundle exec rspec"
  end

  namespace :test do
    desc "Start a server to view the test app"
    task :serve do
      sh "bundle exec rackup"
    end
  end

  namespace :previews do
    desc "Preparse the previews"
    task preparse: :environment do
      Lookbook::Engine.parser.parse
      puts "Lookbook preview parsing complete"
    end
  end

  namespace :release do
    desc "Bump the Lookbook engine version number"
    task :bump_version, [:version] do |t, args|
      filename = Lookbook::Engine.root.join("lib/lookbook/version.rb")
      current_version = Lookbook::VERSION.to_s
      new_version = args[:version].sub("v", "").tr("-", ".")
      file = File.open(filename)
      contents = file.read
      File.write(filename, contents.gsub(current_version, new_version))
    end

    desc "Build Gem and push to RubyGems"
    task :build_and_push do
      sh("rake build && gem push pkg/lookbook-#{Lookbook::VERSION}.gem")
    end
  end
end
