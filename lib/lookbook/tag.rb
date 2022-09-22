require "shellwords"

module Lookbook
  class Tag
    attr_reader :data, :arg_names
    attr_accessor :args, :opts

    def initialize(tag_object, arg_names = nil, parser: nil, eval_scope: nil, file: nil, **options)
      @tag_object = tag_object
      @arg_names = arg_names
      @args = {}
      @opts = {}
      @options = options
      @parser = parser
      @eval_scope = eval_scope
      @file = file
      @data = Store.new
      run_parser
    end

    def tag_name
      @name ||= @tag_object.tag_name.to_sym
    end

    def tag_body
      @tag_object.text
    end

    def get_opt(key, fallback = nil)
      opts[key] || fallback
    end

    def opts_str
      @opts_str ||= text_tokens.size > args_count ? text_tokens.slice(args_count, text_tokens.size).join(" ") : ""
    end

    protected

    def parse_args
      unless arg_names.nil?
        values = text_tokens.slice(0, args_count)
        @args = build_args(values)
      end
    end

    def parse_opts
      return @opts if @options[:parse_options] == false
      tag_opts = Lookbook::TagOptions.new(opts_str,
        eval_scope: @eval_scope,
        base_dir: File.dirname(@file)
      )
      options = tag_opts.resolve || {}
      @opts = if options.is_a?(Hash)
        options.with_indifferent_access
      else
        Lookbook.logger.warn "'@#{tag_name}' tag options should resolve to a Hash"
        options
      end
    end

    def run_parser
      parse_args
      parse_opts
      @parser.call(self) if @parser.respond_to?(:call)
    end

    def arg_options
      return [] if arg_names.nil?
      @arg_options ||= arg_names.map do |arg|
        unless arg.is_a? Hash
          name = arg
          arg = {
            name: name.to_sym
          }
        end
        arg[:parse] = false unless arg.key? :parse
        arg
      end
    end

    def validate_arg_names
      if arg_names.present?
        arg_names.each do |name|
          if methods.include? name.to_sym
            raise ArgumentError, "'#{name}' is a reserved word and cannot be used as an argument name."
          end
        end
      end
    end

    def args_count
      arg_options.size
    end

    def parse_yaml(str, fallback = "~")
      YAML.safe_load(str || fallback)
    end

    def text_tokens
      @tokens ||= Shellwords.split(@tag_object.text)
    end

    def build_args(values)
      arg_options.map.with_index do |arg, i|
        value = values[i]
        value = parse_arg(value) if arg[:parse] == true && value.present?
        [arg[:name].to_sym, value]
      end.to_h
    end

    def method_missing(name, *method_args)
      if name.end_with? "="
        data[name.to_s.chomp("=").to_sym] = method_args.first
      else
        data[name] || args[name]
      end
    end

    def respond_to_missing?(name, *)
      data.key?(name) || args.key?(name)
    end
  end
end
