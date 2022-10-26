module Lookbook
  class YardTag < ::YARD::Tags::Tag
    def initialize(*args)
      if args.size < 2
        tag_name = self.class.name.demodulize.underscore.chomp("_tag")
        super(tag_name, args.first, nil, @name)
      else
        super(*args)
      end
    end

    def text
      tag_parts[:text]
    end

    def options
      tag_parts[:options]
    end

    def to_s
      value.to_s
    end

    # The `value` attribute should be overriden in child classes
    # to return the resolved value of the tag, where appropriate.
    # i.e. for the @hidden tag this would return boolean true/false.
    alias_method :value, :text

    protected

    def tag_parts
      if @tag_parts.nil?
        options, text = TagOptionsParser.call(@text, {
          file: host_file,
          base_dir: (File.dirname(host_file) if host_file),
          eval_context: host_class_instance,
          permit_eval: Lookbook.config.preview_params_options_eval
        })
      end
      @tag_parts ||= {options: options, text: text}
    end

    def host_file
      location = object&.files&.first # [file, line_number]
      location&.first
    end

    def host_class_instance
      host_class = lookup_host_class
      host_class&.new
    end

    def lookup_host_class
      host_code_object = if object.is_a?(YARD::CodeObjects::MethodObject)
        object.parent
      elsif object.is_a?(YARD::CodeObjects::ClassObject)
        object
      end
      host_code_object&.path&.constantize
    end
  end
end
