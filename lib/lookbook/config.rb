module Lookbook
  class Config
    class << self
      alias_method :default, :new

      def defaults
        options({
          project_name: "Lookbook",

          preview_collection_label: "Previews",
          preview_controller: "LookbookPreviewController",
          preview_template: "lookbook/previews/preview",
          preview_layout: nil,
          preview_paths: [Rails.root.join("test/components/previews")],
          preview_watch_paths: [],
          preview_watch_extensions: ["rb", "html.*"],

          inspector_target_preview_template: "lookbook/inspector/preview",
          inspector_panels: default_inspector_panels,
          inspector_preview_panels: [:preview, :output],
          inspector_drawer_panels: [:source, :notes],

          component_paths: ["app/views", "app/components"],

          markdown_options: default_markdown_options,

          reload_on_change: nil,
          mount_path: "/lookbook"
        })
      end

      def default_inspector_panels
        {
          preview: {
            label: "Preview",
            partial: "lookbook/inspector/panels/preview",
            type: nil
          },
          output: {
            label: "Output",
            partial: "lookbook/inspector/panels/output",
            type: :code
          },
          source: {
            label: "Source",
            partial: "lookbook/inspector/panels/source",
            type: :code
          },
          notes: {
            label: "Notes",
            partial: "lookbook/inspector/panels/notes",
            type: :markdown
          }
        }
      end

      def default_markdown_options
        {}
      end

      private

      def options(opts = {})
        opts.transform_values! { _1.is_a?(Hash) ? options(_1) : _1 }
        ActiveSupport::OrderedOptions.new.merge!(opts)
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
