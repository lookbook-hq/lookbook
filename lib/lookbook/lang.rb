module Lookbook
  module Lang
    class << self
      LANGUAGES = [
        {
          name: "ruby",
          ext: ".rb",
          label: "Ruby"
        },
        {
          name: "html",
          ext: ".html",
          label: "HTML"
        },
        {
          name: "erb",
          ext: ".erb",
          label: "ERB"
        },
        {
          name: "haml",
          ext: ".haml",
          label: "Haml"
        },
        {
          name: "slim",
          ext: ".slim",
          label: "Slim"
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
