module Lookbook
  class CustomTag < YardTag
    def initialize(tag_name, text, *args)
      @config = Engine.tags.get_tag(tag_name)
      @custom_attributes = Store.new
      validate_arg_names
      super(tag_name, text, *args)
    end

    # Method aliases to keep compatability with
    # the original custom tag implementation
    alias_method :tag_body, :text
    alias_method :opts, :options

    protected

    def arg_names
      @config.fetch(:named_args, [])
    end

    def tag_args
      @tag_args ||= parse_tag
    end

    def parse_tag
      text_tokens = Shellwords.split(text)
      values = text_tokens.slice(0, arg_names.size)

      tag_args = arg_names.map.with_index do |name, i|
        [name.to_sym, values[i]]
      end.to_h

      @config.fetch(:after_parse) { proc {} }.call(self)
      tag_args
    end

    def validate_arg_names
      arg_names.each do |name|
        if methods.include? name.to_sym
          raise ParserError.new "'#{name}' is a reserved word and cannot be used as an argument name."
        end
      end
    end

    def method_missing(name, *args)
      if name.end_with? "="
        @custom_attributes[name.to_s.chomp("=")] = args.first
      else
        @custom_attributes[name] || tag_args[name]
      end
    end

    def respond_to_missing?(name, include_private)
      @custom_attributes.key?(name) || tag_args.key?(name) || super
    end
  end
end
