require_relative "../lookbook"

namespace :lookbook do
  namespace :previews do
    desc "Preparse the previews"
    task preparse: :environment do
      puts "The lookbook:preparse task is no longer required and will be removed in v2.0"
    end
  end
end
