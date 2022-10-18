require "rails_helper"

RSpec.describe Lookbook::FileWatcher do
  context "default" do
    let(:file_watcher) { described_class.new }
    let(:fixtures_path) { Lookbook::Engine.root.join("spec/fixtures/to_watch") }
    let(:text_file_path) { "#{fixtures_path}/file.txt" }
    let(:json_file_path) { "#{fixtures_path}/file.json" }

    before do
      file_watcher = described_class.new # standard:disable Lint/UselessAssignment
    end

    after do
      file_watcher.stop
      File.write(text_file_path, "")
    end

    it "can watch for changes" do
      text_callback = ->(changes) { puts "text callback" }
      json_callback = ->(changes) { puts "json callback" }

      expect(text_callback).to receive(:call)
      expect(json_callback).to receive(:call)

      file_watcher.watch(fixtures_path, &text_callback)
      file_watcher.watch(fixtures_path, ["json"], &json_callback)

      file_watcher.start

      File.write(text_file_path, "some changes have happened")
      File.write(json_file_path, '{"message": "some changes have happened"}')
      sleep 2
    end
  end
end
