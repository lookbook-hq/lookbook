---
layout: default
title: Custom Tags
---

It is possible to define new [tags](/guide/previews/annotating/#tags) for use when annotating preview files.

Tag data can then be accessed in [custom inspector panels](/guide/extend/panels/) and so can be used to build bespoke functionality that would otherwise not be natively supported by Lookbook.

## Tag structure

Lookbook tags take the following form:

```rb
@tag_name <tag_body>
```

The `<tag_body>` is a string of arbitrary free text which can be anything you want.

_However_, in practice most tags expect this text to contain one or more **space-separated** positional arguments
which can optionally be followed by a set of **YAML-encoded** tag options in the last part of the text, which looks more like this:

```rb
@tag_name <arg_1> <arg_2> ... <arg_x> <opts?>
```

The `@param` tag provides a good example of this in action:

```rb
@param rating select [Bad, Good, Average]
```

In the above example the `@param` tag body will be parsed to extract the following information:

|                  | name         | value                        | type   |
|------------------|--------------|------------------------------|--------|
| 1st argument     | `param_name` | `rating`                     | String |
| 2nd argument     | `field_type` | `select`                     | String |
| rest of tag body | `options`    | `["Bad", "Good", "Average"]` | Array  |


{%= note :info do %}
Because tag arguments are _space-separated_, argument values that need to contain a space must be surrounded by double quotes:

```rb
@tag_name first_arg "second value" third
```
{% end %}

### Tag body parsing

By default, Lookbook will attempt to parse the tag body into a set of arguments and options.
To make this possible an array of argument names (in the order which the values will appear in the tag body) needs be provided when [defining a new tag](#adding-tags).

If your desired custom tag structure does not fit the standard format outlined above,
then it is also possible to provide your own [custom parser](#using-custom-parsing-logic) to take full control of the process.

## Adding tags

You can add a custom tag using the `Lookbook.define_tag` method when you configure your Lookbook installation:

```ruby
Lookbook.define_tag(<name>, <arg_names?>)
```

{%= options_list do |list| %}
  {% list.option name: "<name>", type: "Symbol" do %}
    A unique name for the tag
  {% end %}
  {% list.option name: "<arg_names?>", type: "Array" do %}
    Array of positional argument names to match to values when parsing the tag body contents.
  {% end %}
{% end %}

## Basic example

In the following example we will create a `@status` tag that will allow a workflow status 'label' to be applied to each preview. For example:

```rb
@status wip    # work in progress
@status ready  # can be used
```

The `@status` tag only expects a single argument (`current_status`), so we can define the tag as follows:

```ruby
# config/application.rb
Lookbook.define_tag(:status, [:current_status])
```

All parsed argument values can be then accessed as properties of the tag object when using in templates:

```erb
<p>Current status: <%= tag.current_status # 'wip' %></p>
```

## Options example

An (optional!) set of options can be provided at the end of the tag body content. Options should be provided as a YAML-formatted hash.

{%= note :info do %}
The `@status` example above doesn't need any changes in order to support accepting options - the parser will automatically handle them if they are found in the tag body.
{% end %}

```rb
@status wip { display_style: badge }
```

The options hash can be accessed via the `.opts` property on `tag` objects:

```erb
Current status:
<% if tag.opts[:display_style] == "badge" %>
  <span class="badge">
    <%= tag.current_status %>
  </span>
<% else %>
  <%= tag.current_status %>
<% end %>
```

## Using custom parsing logic

In some cases you may want to implement you own tag body parsing logic, to either replace or augment the standard parsing behavior.

You can do this by providing a block to the `Lookbook.define_tag` method when adding a new tag.

The block will receive a `tag` object as it's only argument - the parser can access tag information from this and set arbitrary properties on this object for later use in templates.

```ruby
Lookbook.define_tag(:new_tag) do |tag|
  # custom parser logic here...
end
```

[See below](#tag-object-properties) for details on available tag object properties and methods.

### Keywords example

In this example, we will define a `@keywords` tag which allows for specifying a list of keywords in comma-separated list:

```
@keywords marketing, email, webinar
```

The standard parsing behaviour would not work here - it would attempt to parse each keyword as an argument value.

Instead we can use some custom parsing logic to generate an array from the comma-separated list, and store it on the `tag` object for later reference.

```ruby
Lookbook.define_tag(:keywords) do |tag|
  tag.keywords = tag.tag_body.split(",").map(&:strip)
end
```

```erb
The keywords for this preview are: <%= tag.keywords.join(" | ") %>
```

## Accessing tag data in panel templates

Both `preview` and `example` entities (available in panel templates) have`.tag` and `.tags` methods for accessing tag data.

{%= method_list do |list| %}
  {% list.method name: "entity.tags", signature: "entity.tags <tag_name?>", example_lang: :erb do |item| %}
      {% item.example do %}
        &lt;% link_tags = example.tags(:link) %&gt;
        <ul>
          &lt;% link_tags.each do |link| %&gt;
            <li>
              <a href="&lt;%= link.href %&gt;">&lt;%= link.text %&gt;</a>
            </li>
          &lt;% end %&gt;
        </ul>
      {% end %}
      {% item.options_list do |options| %}  
        {% options.option name: "<tag_name?>", type: "Symbol" do %}
          Optional tag name. If provided only tags of that type will be returned, otherwise _all_ tags will be returned.
        {% end %}
      {% end %}  
      {% item.description do %}        
        For when more than one instance of a tag may be added, the `.tags` method returns an array of `<tag_name>`-type tag objects (or _all_ tag objects if no `<tag_name>` argument is provided).

        For example, an imaginary `@link` tag might allow adding one or more documentation or related articles links to the preview example,
        and the custom panel could display those links to the end-user.
      {% end %}    
  {% end %}
{% end %}

{%= note :info do %}
If you only expect a maximum of **one** instance of a particular tag to be added to the entity, then you can use the
singular `entity.tag(<tag_name?>)` method instead to return just the first matching result.
{% end %}


### Tag object properties

{%= options_list do |list| %}
  {% list.option name: "tag.tag_name" do %}
    Tag name
  {% end %}
  {% list.option name: "tag.tag_body" do %}
    The raw tag body string
  {% end %}
  {% list.option name: "tag.args" do %}
    Arguments hash
  {% end %}
  {% list.option name: "tag.opts" do %}
    Options hash
  {% end %}
{% end %}

Additionally, all `tags.args` entries are automatically made accessible as properties directly on the `tag` object itself:

```rb
tag.args[:foo] = "bar"
tag.foo # --> "bar"
```


{{toc}}



