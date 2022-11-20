module Lookbook
  module Lang
    class << self
      LANGUAGES = [
        {
          name: "ruby",
          ext: ".rb",
          label: "Ruby",
          comment: "# %s"
        },
        {
          name: "html",
          ext: ".html",
          label: "HTML",
          comment: "<!-- %s -->"
        },
        {
          name: "erb",
          ext: ".erb",
          label: "ERB",
          comment: "<%%# %s %%>"
        },
        {
          name: "haml",
          ext: ".haml",
          label: "Haml",
          comment: "<!-- %s -->"
        },
        {
          name: "slim",
          ext: ".slim",
          label: "Slim",
          comment: "<!-- %s -->"
        },
        {
          name: "tsx",
          ext: ".tsx",
          label: "TypeScript",
          comment: "// %s"
        },
        {
          name: "js",
          ext: ".js",
          label: "JavasScript",
          comment: "// %s"
        },
        {
          name: "css",
          ext: ".css",
          label: "CSS",
          comment: "/* %s */"
        }
      ]

      def find(name)
        LANGUAGES.find { |l| l[:name] == name.to_s }
      end

      def guess(path, fallback_name = nil)
        ext = File.extname(path)
        lang = LANGUAGES.find { |l| l[:ext] == ext }
        lang || (find(fallback_name) if fallback_name)
      end
    end
  end
end
