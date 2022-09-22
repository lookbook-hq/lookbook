module Lookbook
  class DebugMenu::Component < Lookbook::BaseComponent
    def initialize(version: nil, docs_url: nil, repo_url: nil, **html_attrs)
      @version = version
      @docs_url = docs_url
      @repo_url = repo_url
      super(**html_attrs)
    end

    def debug_data
      content
    end

    def debug_data?
      debug_data.present?
    end
  end
end
