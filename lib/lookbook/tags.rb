module Lookbook
  module Tags
    def define_tag(name, args = nil, opts = {}, &block)
      name = name.to_s.downcase.underscore.to_sym
      if args.is_a? Hash
        opts = args
        args = nil
      end
      opts[:args] = args
      opts[:parser] = block if block
      Lookbook.config.preview_tags[name] = opts
    end

    def self.process_tags(tag_objects)
      return [] if tag_objects.none?
      tag_objects.map do |tag_object|
        opts = Lookbook.config.preview_tags[tag_object.tag_name] || {}
        Lookbook::Tag.new(tag_object, opts[:args], **opts.except(:args))
      end.compact
    end
  end
end
