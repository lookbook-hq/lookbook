# Rake task to copy Lookbook pre-compiled assets for production deployment
#
# Problem: Lookbook's pre-built CSS contains modern syntax that Sprockets' SassCompressor
# cannot parse (e.g., @media (width >= 480px)). Instead of adding to the asset pipeline,
# we copy the pre-built assets to public/assets/lookbook-assets/ where they'll be uploaded
# to CDN alongside other precompiled assets.
#
# The assets will be served from CDN in production via the lookbook_asset_path helper.

namespace :lookbook do
  desc 'Copy Lookbook pre-compiled assets to public/assets/lookbook-assets for CDN deployment'
  task copy_assets: :environment do
    require 'fileutils'

    lookbook_source = Lookbook::Engine.root.join('public', 'lookbook-assets')
    # Copy to public/assets/ so they're included in normal asset deployment
    public_dest = Rails.public_path.join('assets/lookbook-assets')

    # Remove existing directory to ensure clean copy
    FileUtils.rm_rf(public_dest) if public_dest.exist?

    # Ensure parent directory exists
    FileUtils.mkdir_p(public_dest.parent)

    # Copy all Lookbook assets
    FileUtils.cp_r(lookbook_source, public_dest)

    file_count = Dir.glob(public_dest.join('**', '*')).count { |f| File.file?(f) }
    puts '✓ Lookbook assets copied to public/assets/lookbook-assets/'
    puts "  #{file_count} files ready for CDN deployment"
  end
end

# Hook into assets:precompile so this runs automatically during deployment
if Rake::Task.task_defined?('assets:precompile')
  Rake::Task['assets:precompile'].enhance do
    Rake::Task['lookbook:copy_assets'].invoke
  end
end
