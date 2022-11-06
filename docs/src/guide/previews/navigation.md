---
layout: default
title: Customising the Navigation
---

Lookbook automatically generates a hierarchical navigation tree for previews based on the folder structure of your preview directory.

The navigation labels for previews and preview examples are generated based on the preview class name and method names, respectively, but this can be customised on a per-preview basis.

{{toc}}

## Custom labels

Use the `@label` annotation tag if you want to customise the navigation label for a preview or example.

```ruby
@label <text>
```

The `@label` tag can be used on both preview classes and example methods:

```ruby
# @label A custom preview label
class FooComponentPreview < ViewComponent::Preview
  # @label A custom example Label
  def default
    # ...
  end
end
```

## Navigation paths

Use the `@logical_path` tag to change the location that the preview will appear in within the nav tree.

```ruby
@logical_path <directory_path>
```

The `@logical_path` value should be the path to the nav directory that you wish to display the preview within.

{%= note :info do %}
Note that the provided path is just a virtual construct - it does not have to really exist anywhere in your app. 
{% end %}

```ruby
# @logical_path elements/base
class FooComponentPreview < ViewComponent::Preview
  # ...
end
```

In the example above, the `FooComponentPreview` would exist in the navigation at `Elements > Base > Foo` rather than at the top level of the nav tree.

The `@logical_path` tag can only be used on preview classes, not on example methods.

## Hiding previews

By default, all previews and examples are shown in the preview navigation.

The `@hidden` annotation tag lets you hide entire previews or individual examples from the navigation.

{%= note :info do %}
Hidden previews are still accessible at their URL so this can be useful when developing components that are not yet ready to share with the wider team.
{% end %}

#### Hide an entire preview:

```ruby
# @hidden
class FooComponentPreview < ViewComponent::Preview
  def example_1
    # ...
  end
end
```

#### Hide a specific example:

```ruby
class FooComponentPreview < ViewComponent::Preview
  def ready_to_go
    # ...
  end

  # @hidden
  def work_in_progress
    # ...
  end
end
```

## Sorting preview examples

By default, preview examples in the navigation are ordered in the same order that their corresponding methods appear within the preview class.

If you prefer to have your preview examples sorted alphabetically, you can use the `sort_examples` global [configuration option](/api/config/#sort_examples):

```ruby
# config/application.rb
config.lookbook.sort_examples = true
```