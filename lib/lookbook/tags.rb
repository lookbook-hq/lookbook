module Lookbook
  module Tags
    def define_tag(name, opts = {})
      Lookbook.config.preview_tags[name] = opts
    end

    def self.process_tags(tag_objects)
      return [] if tag_objects.none?
      tag_objects.map do |tag_object|
        name = tag_object.tag_name.to_sym
        tag_config = Lookbook.config.preview_tags[name] || {}
        tag = Lookbook::Tag.new(name, tag_object)
        if tag_config[:process].is_a?(Proc) 
          output = tag_config[:process].call(tag)
          unless output.is_a? Hash
            Lookbook.logger.error("[Lookbook] Custom preview tag `#{name}` #process must return a Hash")
            output = nil
          end
          output
        else
          {}
        end
      end.compact
    end
  end
end