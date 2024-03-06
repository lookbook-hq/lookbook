module Lookbook
  class Language
    delegate :to_s, to: :name

    attr_reader :name, :label

    def initialize(name, ext:, label: nil, comment: nil, **kwargs)
      @name = Utils.name(name).to_sym
      @ext = ext
      @label = label || name.to_s.titleize
      @comment = comment || "%s"
    end

    def matches?(test)
      if test.is_a?(Symbol)
        test == name
      elsif test.to_s.start_with?(".")
        test == ext
      elsif test.to_s.include?(".")
        test == File.extname(test)
      else
        false
      end
    end

    def ext
      ".#{@ext.delete_prefix(".")}"
    end

    def comment(text)
      sprintf(@comment, text).html_safe
    end

    def to_sym = name
  end
end
