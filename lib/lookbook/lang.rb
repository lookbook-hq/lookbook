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
        }
      ]

      def find(name)
        LANGUAGES.find { |l| l[:name] == name.to_s }
      end

      def guess(path)
        ext = File.extname(path)
        LANGUAGES.find { |l| l[:ext] == ext }
      end
    end
  end
end
