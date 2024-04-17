module Lookbook
  class Config
    class << self
      alias_method :default, :new

      def defaults
        options({
          project_name: "Lookbook",

          component_paths: ["app/views", "app/components"],

          preview_controller: "LookbookPreviewController",
          preview_template: "lookbook/previews/preview",
          preview_url_param: :name,
          preview_layout: nil,
          preview_paths: ["test/components/previews", "test/mailers/previews"],
          preview_watch_paths: [],
          preview_watch_extensions: ["rb", "html.*"],
          preview_tags: default_preview_tags,

          previews_nav_label: "Previews",
          previews_nav_filter: true,

          inspector_target_preview_template: "lookbook/inspector/preview",
          inspector_target_mailer_template: "lookbook/inspector/mailer_preview",
          inspector_panels: default_inspector_panels,
          inspector_preview_panels: [:preview, :output],
          inspector_drawer_panels: [:source, :notes, :params],
          inspector_embed_panels: [:source, :output, :notes, :params],
          inspector_param_inputs: default_inspector_param_inputs,

          sidebar_nav_panels: [:previews, :pages],
          status_bar: Rails.env.development?,

          page_paths: ["test/components/docs"],
          page_watch_paths: [],
          page_watch_extensions: ["rb", "html.*"],

          page_controller: "LookbookPageController",
          page_template: "lookbook/pages/page",
          page_layout: "lookbook/page",

          pages_nav_label: "Pages",
          pages_nav_filter: true,

          markdown_options: default_markdown_options,

          languages: default_languages,

          reload_on_change: Rails.env.development?,
          mount_path: "/lookbook"
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
          source: {
            label: "Source",
            partial: "lookbook/inspector/panels/source"
          },
          notes: {
            label: "Notes",
            partial: "lookbook/inspector/panels/notes"
          },
          params: {
            label: "Params",
            partial: "lookbook/inspector/panels/params"
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
          Lookbook::LabelTag,
          Lookbook::HiddenTag,
          Lookbook::PriorityTag,
          Lookbook::ParamTag
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
