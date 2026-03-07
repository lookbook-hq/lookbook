module TestUtils
  def flatten_tree_hash(hash)
    entries = []
    entries << hash.except(:children)
    if hash.key?(:children)
      hash[:children].each { entries.push(*flatten_tree_hash(_1)) }
    end
    entries.flatten.compact
  end

  def replace_string_in_file(path, str, replacement)
    file = File.open(path)
    contents = file.read
    File.write(path, contents.gsub(str, replacement))
  end

  def assert_nodes_match_files(nodes, files, msg = nil)
    assert_equal files.count, nodes.count, msg
    diff = nodes.map(&:path).difference(files)
    assert_empty diff, "#{msg} — unexpected nodes: #{diff.map(&:basename).join(", ")}"
  end

  def analyze_fixture(dir, **options)
    Lookbook.analyze(Fixtures.dir(dir), **options)
  end

  def spec_from_fixture(path, visitors: [Lookbook::PreviewClassParser, Lookbook::YardTagsHandler])
    spec = Lookbook::SpecNode.from(Fixtures.file(path))
    visitors.each { |v| spec.accept(v.is_a?(Class) ? v.new : v) }
    spec
  end

  def page_from_fixture(path, visitors: [Lookbook::FrontmatterExtractor])
    page = Lookbook::PageNode.from(Fixtures.file(path))
    visitors.each { |v| page.accept(v.is_a?(Class) ? v.new : v) }
    page
  end

  extend self
end
