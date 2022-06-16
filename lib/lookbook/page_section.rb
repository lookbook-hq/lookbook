module Lookbook
  class PageSection < Page

    def name
      return @name if @name.present?
      matches = full_path.to_s.match(%r{\[(?<name>\w+)\]})
      @name ||= matches[:name]
    end

    def id
      "#{super}-#{name}"
    end

    def url_path
      nil
    end

    def path
      super.gsub("[#{name}]", "")
    end

    def type
      :page_section
    end

    def lookup_path
       "#{super}/#{name}"
    end

  end
end