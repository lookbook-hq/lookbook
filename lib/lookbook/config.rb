module Lookbook
  class Config
    class << self
      alias_method :default, :new

      def defaults
        DataObject.new({
          project_name: "Lookbook",
          project_links: [],

          component_paths: ["app/views", "app/components"],

          preview_controller: "LookbookPreviewController",
          preview_layout: nil,
          preview_url_param: :name,
          preview_overview_template: "lookbook/previews/overview",
          preview_paths: ["lookbook/previews", "test/components/previews"],
          preview_watch_paths: [],
          preview_watch_extensions: ["rb", "html.*"],
          preview_display_options: {},
          preview_disable_action_view_annotations: true,

          preview_tags: default_preview_tags,

          preview_statuses: default_preview_statuses,
          preview_default_status: nil,

          preview_embed_panels: [:usage, :output, :notes, :params],

          previews_nav_label: "Previews",
          previews_nav_filter: true,

          inspector_target_preview_template: "lookbook/inspector/preview",
          inspector_target_mailer_template: "lookbook/inspector/mailer_preview",
          inspector_panels: default_inspector_panels,
          inspector_preview_panels: [:preview, :output].freeze,
          inspector_drawer_panels: [:usage, :params, :metadata, "*"],
          inspector_param_inputs: default_inspector_param_inputs,

          page_route: "pages",
          page_paths: ["lookbook/docs", "test/components/docs"],
          page_extensions: ["md", "html.*", "md.*"],
          page_watch_paths: [],
          page_watch_extensions: [],
          page_frontmatter_defaults: default_frontmatter_options,

          pages_nav_label: "Pages",
          pages_nav_filter: true,

          ui_nav_panels: [:previews, :pages],
          ui_status_bar: Rails.env.development?,
          ui_color_scheme_switcher: true,

          markdown_options: default_markdown_options,

          languages: default_languages,

          reload_on_change: Rails.env.development?,
          mount_path: "/lookbook",

          enabled: Rails.env.development? || Rails.env.test?
        })
      end

      def default_inspector_panels
        {
          preview: {
            label: "Preview",
            partial: "lookbook/inspector/panels/preview"
          },
          output: {
            label: "Output",
            partial: "lookbook/inspector/panels/output"
          },
          usage: {
            label: "Usage",
            partial: "lookbook/inspector/panels/usage"
          },
          params: {
            label: "Params",
            partial: "lookbook/inspector/panels/params",
            disabled: ->(data) { !data.target.params? }
          },
          metadata: {
            label: "Metadata",
            partial: "lookbook/inspector/panels/metadata"
          }
        }
      end

      def default_inspector_param_inputs
        {
          text: {
            partial: "lookbook/inspector/inputs/text"
          },
          email: {
            partial: "lookbook/inspector/inputs/text"
          },
          number: {
            partial: "lookbook/inspector/inputs/text"
          },
          tel: {
            partial: "lookbook/inspector/inputs/text"
          },
          url: {
            partial: "lookbook/inspector/inputs/text"
          },
          textarea: {
            partial: "lookbook/inspector/inputs/textarea"
          },
          select: {
            partial: "lookbook/inspector/inputs/select"
          },
          checkbox: {
            partial: "lookbook/inspector/inputs/checkbox"
          },
          toggle: {
            partial: "lookbook/inspector/inputs/checkbox"
          }
        }
      end

      def default_preview_tags
        [
          Lookbook::DisplayTag,
          Lookbook::HiddenTag,
          Lookbook::IdTag,
          Lookbook::LabelTag,
          Lookbook::LocationTag,
          Lookbook::ParamTag,
          Lookbook::StatusTag
        ]
      end

      def default_preview_statuses
        {
          ready: {
            label: "Ready",
            color: :green,
            description: "Ready for use."
          },
          wip: {
            label: "In Progress",
            color: :amber,
            description: "Work in progress. Reference with caution."
          },
          deprecated: {
            label: "Deprecated",
            color: :red,
            description: "Deprecated, or to be deprecated."
          }
        }
      end

      def default_markdown_options
        {
          tables: true,
          fenced_code_blocks: true,
          disable_indented_code_blocks: true,
          strikethrough: true,
          highlight: true,
          with_toc_data: true,
          lax_spacing: true,
          escape_html: false
        }
      end

      def default_languages
        {
          html: {
            label: "HTML",
            ext: ".html",
            comment: "<!-- %s -->"
          },
          ruby: {
            label: "Ruby",
            ext: ".rb",
            comment: "# %s"
          },
          erb: {
            label: "ERB",
            ext: ".erb",
            comment: "<%%# %s %%>"
          }
        }
      end

      def default_frontmatter_options
        {
          footer: true,
          header: true,
          landing: false,
          data: {}
        }
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
