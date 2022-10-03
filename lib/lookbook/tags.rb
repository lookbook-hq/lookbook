module Lookbook
  module Tags
    def self.process_tags(tag_objects, file: nil, eval_scope: nil)
      return [] if tag_objects.none?
      tag_objects.map do |tag_object|
        tag_config = Engine.tags.get_tag(tag_object.tag_name).to_h
        tag_opts = tag_config[:opts].to_h
        Lookbook::Tag.new(tag_object,
          tag_opts[:named_args],
          parser: tag_opts[:args_parser],
          **tag_opts.except(:named_args, :args_parser),
          file: file,
          eval_scope: eval_scope)
      end.compact
    end
  end
end
