require_relative "../lookbook"

namespace :lookbook do
  namespace :previews do
    desc "Preparse the previews"
    task preparse: :environment do
      Lookbook::Engine.parser.parse
      puts "Lookbook preview parsing complete"
    end
  end
end
