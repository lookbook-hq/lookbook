module Lookbook
  class Config
    class << self
      alias_method :default, :new

      def defaults
        ActiveSupport::OrderedOptions.new.merge!({
          preview_collection_label: "Previews",
          preview_controller: "LookbookPreviewController",
          preview_template: "lookbook/previews/preview",
          preview_layout: nil,
          preview_paths: [Rails.root.join("test/components/previews")],
          preview_watch_extensions: ["rb", "html.*"],

          inspector_preview_template: "lookbook/inspector/preview",
          inspector_output_template: "lookbook/inspector/output",
          inspector_source_template: "lookbook/inspector/source",
          inspector_notes_template: "lookbook/inspector/notes",

          reload_on_change: nil,
          mount_path: "/lookbook"
        })
      end
    end

    class_attribute :current, default: defaults, instance_predicate: false

    def initialize
      @config = self.class.defaults
    end

    delegate_missing_to :config

    private

    attr_reader :config
  end
end
