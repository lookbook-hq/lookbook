module Fixtures
  ASSET_EXTENSIONS = [".js", ".css", ".png", ".svg", ".gif", ".jpg", ".webp", ".jpeg"]

  def file(path)
    file_path = Pathname(File.dirname(__FILE__)).join("../fixtures").join(path).expand_path
    raise "Missing fixture file: #{file_path}" unless file_path.exist?
    file_path
  end

  alias_method :dir, :file

  def files_within(dir, recursive: true, grep: nil)
    files = Dir[%(#{file(dir)}/#{"**/" if recursive}*)]
    files = grep.present? ? files.grep(grep) : files
    files.map { Pathname(_1) }
  end

  def asset_files_within(dir)
    files_within(dir).select { _1.extname.to_s.in?(ASSET_EXTENSIONS) }
  end

  def markdown_files_within(dir)
    files_within(dir).select do |pathname|
      pathname.basename.to_s.match?(/\.(md|md\.erb)$/)
    end
  end

  def spec_files_within(dir)
    files_within(dir)
      .select { _1.basename.to_s.end_with?("_preview.rb", "_booklet.rb") }
  end

  def folder_files_within(dir)
    files_within(dir).select { _1.directory? }
  end

  def entity_files_within(dir)
    asset_files_within(dir) +
      markdown_files_within(dir) +
      spec_files_within(dir) +
      folder_files_within(dir)
  end

  def anon_files_within(dir)
    files_within(dir) - entity_files_within(dir)
  end

  extend self
end
