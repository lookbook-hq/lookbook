class Builders::TailwindJit < SiteBuilder
  def build
    hook :site, :pre_reload do |_, paths|
      # Don't trigger refresh if it's a frontend-only change
      next if paths.length == 1 && paths.first.ends_with?("manifest.json")

      # Save out a comment file to trigger Tailwind's JIT
      refresh_file = site.in_root_dir("frontend", "styles", "jit-refresh.css")
      File.write refresh_file, "/* #{Time.now.to_i} */"
      throw :halt # don't continue the build, wait for watcher rebuild
    end
  end
end
