module Lookbook
  module Preview
    include Taggable

    def id
      lookbook_path.tr("/", "-").tr("_", "-")
    end

    # Examples::FooBarComponent::Preview -> "Foo Bar"
    def lookbook_label
      super.presence || lookbook_path.split("/").last.titleize
    end

    def lookbook_type
      :preview
    end

    def lookbook_example(example_name)
      lookbook_examples.find { |m| m.name == example_name }
    end

    def lookbook_examples
      return @lookbook_examples if @lookbook_examples.present?
      public_methods = public_instance_methods(false)
      public_method_objects = code_object.meths.filter { |m| public_methods.include?(m.name) }
      examples = public_method_objects.map { |m| PreviewExample.new(m.name.to_s, self) }
      sorted = Lookbook.config.sort_examples ? examples.sort_by(&:label) : examples
      @lookbook_examples = []
      if code_object.groups.any?
        sorted.group_by { |m| m.group }.each do |name, examples|
          if name.nil?
            @lookbook_examples += examples
          else
            name = lookbook_label if name.strip == ""
            @lookbook_examples << PreviewGroup.new(name.underscore, self, examples)
          end
        end
      else
        @lookbook_examples = sorted
      end
      @lookbook_examples
    end

    # Examples::FooBarComponentPreview -> "Examples::FooBar"
    # Examples::FooBarComponent::Preview -> "Examples::FooBar"
    def lookbook_name
      name.chomp("ComponentPreview").chomp("Component::Preview").chomp("::Preview").chomp("::")
    end

    # Examples::FooBarComponentPreview -> "examples/foo_bar"
    # Examples::FooBarComponent::Preview -> "examples/foo_bar"
    def lookbook_path
      lookbook_name.underscore
    end

    # Examples::FooBarComponentPreview -> "/Users/myname/myapp/test/components/previews/examples/foo_bar_component_preview.rb"
    # Examples::FooBarComponent::Preview -> "/Users/myname/myapp/test/components/previews/examples/foo_bar/component_preview.rb"
    def lookbook_full_path
      base_path = Array(preview_paths).detect do |preview_path|
        Dir["#{preview_path}/#{name.underscore}.rb"].first
      end
      Pathname.new(Dir["#{base_path}/#{name.underscore}.rb"].first)
    end

    def lookbook_parent_collections
      File.dirname(lookbook_path).split("/")
    end

    def lookbook_hierarchy_depth
      lookbook_path.split("/").size
    end

    def lookbook_id
      lookbook_path.tr("/", "-").tr("_", "-")
    end

    def lookbook_layout
      defined?(@layout) ? @layout : nil
    end

    def display_params
      Lookbook.config.preview_display_params.deep_merge(lookbook_display_params)
    end

    class << self
      def all
        ViewComponent::Preview.all.sort_by(&:label)
      end

      def find(path)
        all.find { |p| p.lookbook_path == path }
      end

      def exists?(path)
        !!find(path)
      end
    end

    private

    def taggable_object_path
      name
    end

    alias_method :label, :lookbook_label
    alias_method :notes, :lookbook_notes
    alias_method :hidden?, :lookbook_hidden?
    alias_method :type, :lookbook_type
    alias_method :example, :lookbook_example
    alias_method :get_examples, :lookbook_examples
    alias_method :hierarchy_depth, :lookbook_hierarchy_depth
    alias_method :parent_collections, :lookbook_parent_collections
  end
end
