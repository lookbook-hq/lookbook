module Lookbook
  class Config
    class << self
      alias_method :default, :new

      def defaults
        options({
          project_name: "Lookbook",

          component_paths: ["app/views", "app/components"],

          preview_controller: "LookbookPreviewController",
          preview_layout: nil,
          preview_url_param: :name,
          preview_overview_template: "lookbook/previews/overview",
          preview_paths: ["test/components/previews", "test/mailers/previews"],
          preview_watch_paths: [],
          preview_watch_extensions: ["rb", "html.*"],
          preview_display_options: {},

          preview_tags: default_preview_tags,

          preview_embed_panels: [:usage, :output, :notes, :params],

          previews_nav_label: "Previews",
          previews_nav_filter: true,

          inspector_target_preview_template: "lookbook/inspector/preview",
          inspector_target_mailer_template: "lookbook/inspector/mailer_preview",
          inspector_panels: default_inspector_panels,
          inspector_preview_panels: [:preview, :output].freeze,
          inspector_drawer_panels: [:usage, :notes, :params, :metadata, "*"],
          inspector_param_inputs: default_inspector_param_inputs,

          sidebar_nav_panels: [:previews, :pages],

          page_route: "pages",
          page_paths: ["test/components/docs"],
          page_extensions: ["md", "html.*", "md.*"],
          page_watch_paths: [],
          page_watch_extensions: [],
          page_frontmatter_defaults: default_frontmatter_options,

          pages_nav_label: "Pages",
          pages_nav_filter: true,

          markdown_options: default_markdown_options,

          languages: default_languages,

          status_bar: Rails.env.development?,

          ui_color_scheme_switcher: true,

          reload_on_change: Rails.env.development?,

          mount_path: "/lookbook",
          auto_mount: true
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
          notes: {
            label: "Notes",
            partial: "lookbook/inspector/panels/notes",
            disabled: ->(data) { !data.target.notes? }
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
          Lookbook::LabelTag,
          Lookbook::ParamTag,
          Lookbook::PriorityTag,
          Lookbook::IdTag
        ]
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
