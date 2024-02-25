module Lookbook
  class Config
    class << self
      alias_method :default, :new

      def defaults
        ActiveSupport::OrderedOptions.new.merge!({
          preview_collection_label: "Previews",
          preview_controller: "LookbookPreviewController",
          preview_target_template: "lookbook/inspector/preview",
          preview_template: "lookbook/previews/preview",
          preview_layout: nil,
          preview_paths: [Rails.root.join("test/components/previews").to_s],
          preview_watch_extensions: ["rb", "html.*"],

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
