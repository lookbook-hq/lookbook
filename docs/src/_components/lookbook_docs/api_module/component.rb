module LookbookDocs
  class ApiModule::Component < Base
    attr_reader :name, :type, :category, :toc

    def initialize(name:, description: nil, groups: [], methods: [], tags: [],
      type: "module", category: "general", toc: nil, **attrs)
      @name = name
      @description = description
      @tags = tags
      @methods = methods.map(&:symbolize_keys)
      @type = type.to_sym
      @category = category.to_sym
      @toc = toc
      @attrs = attrs
    end

    def description
      "#{@description.strip.chomp(".")}." if @description.present?
    end

    def instance_methods
      @methods.filter { |m| m[:scope] == "instance" }
    end

    def class_methods
      @methods.filter { |m| m[:scope] == "class" }
    end

    def global_methods
      @methods.filter { |m| m[:scope] == "global" }
    end

    def method_collections
      collections = []

      if category == :helper
        collections.push({groups: group(@methods.map { |m|
                                          m[:scope] = "global"
                                          m
                                        })})
      elsif type == :module
        collections.push({groups: group(class_methods)})
      else
        if class_methods.any?
          collections.push({label: "Class Methods", groups: group(class_methods), id: "class-methods"})
        end
        if instance_methods.any?
          collections.push({label: "Instance Methods", groups: group(instance_methods), id: "instance-methods"})
        end
      end

      collections
    end

    def group(meths)
      groups = meths.group_by { _1[:group] }
      groups.map do |group_name, meths|
        {
          label: if group_name.present?
                   group_name
                 else
                   (groups.many? ? "General" : nil)
                 end,
          methods: meths,
          id: "group-#{group_name.present? ? group_name.dasherize : "general"}"
        }
      end
    end

    def rendered_example
      if example
        markdown("```#{example_lang}\n#{example.strip_heredoc.html_safe}\n```")
      end
    end

    def example
      tags(:example).first&.text
    end

    def example_lang
      tags(:example).first&.name.presence || "erb"
    end

    def tags(tag_name = nil)
      tag_name ? @tags.filter { |t| t[:tag_name].to_s == tag_name.to_s } : @tags
    end
  end
end
