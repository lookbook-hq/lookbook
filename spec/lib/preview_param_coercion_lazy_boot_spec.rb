require "rails_helper"
require "open3"

RSpec.describe "param coercion under lazy_load_previews_and_pages" do
  # Runs in a fresh process so nothing has touched Lookbook::Engine.previews
  # before the first direct render - the situation a host app's
  # render_preview test hits with lazy loading on. The script asserts the
  # registry is still unloaded before rendering, so a future boot change that
  # eagerly loads previews cannot make this pass without exercising the lazy
  # path.
  it "coerces params on the first render_args call and loads the registry doing so" do
    script = <<~RUBY
      require "./spec/spec_helper"
      raise "lazy loading not enabled" unless Lookbook.config.lazy_load_previews_and_pages
      loaded = -> { Lookbook::Engine.instance_variable_get(:@_loaded_previews) }
      raise "registry already loaded before first render" if loaded.call

      result = ParamsComponentPreview.render_args(:coerce_symbol, params: {my_param: "bar"})
      raise "registry not loaded by first render" unless loaded.call

      puts result[:block].call
    RUBY

    stdout, stderr, status = Open3.capture3(
      {"LOOKBOOK_LAZY_LOAD" => "1", "RAILS_ENV" => "test"},
      "bundle", "exec", "ruby", "-e", script,
      chdir: Lookbook::Engine.root.to_s
    )

    expect(status).to be_success, "subprocess failed:\n#{stderr}"
    expect(stdout).to include("my_param=bar class=Symbol")
  end
end
