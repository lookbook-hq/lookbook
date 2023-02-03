---
id: tags-overview
label: Overview
title: Custom Tags
---

<%= render section(overview: true) do |s| %>
  It is possible to define new [tags](<%= guide_url :previews_annotations %>#tags) for use when annotating preview files.

  Tag data can then be accessed in [custom inspector panels](<%= extend_url :panels_overview %>) and so can be used to build bespoke functionality that would otherwise not be natively supported by Lookbook.
<% end %>

<%= render section("Adding a custom tag", id: "adding") do |s| %>
  <% s.with_block_prose do %>
    To register a custom tag use the `Lookbook.add_tag` method when when you [configure your Lookbook installation](<%= guide_url :configuration %>):
  <% end %>

  <% s.with_block_api_method "Lookbook", :add_tag, show: [:params] %>

  <% s.with_block_prose do %>
    For example, an `@design` tag to reference design files could be implemented as follows:

    ```rb
    # config/application.rb
    Lookbook.add_tag(:design, [:tool_name, :design_file_url])
    ```

    This could then be used to annotate preview classes (or scenario methods):

    ```rb
    # @design figma https://share.figma.com/my-org/button-component
    class ButtonComponentPreview < Lookbook::Preview
      def default
        render ButtonComponent.new do
          "Click me"
        end
      end
    end
    ```

    And accessed within a custom inspector panel template:

    ```erb
    <h1>Reference designs</h1>
    <ul>
      <%% preview.tags(:design).each do |tag| %>
        <li>
          <a href="<%%= tag.design_file_url %>">
            <%%= tag.tool_name %>
          </a>
        </li>
      <%% end %>
    </ul>
    ```
  <% end %>
<% end %>

<%= render section("Tag structure", id: "structure") do |s| %>
  <% s.with_block_prose do %>
    Lookbook tags take the following form:

    ```rb
    @tag_name <tag_body>
    ```

    The `<tag_body>` is a string of arbitrary free text which can be anything you want.

    _However_ in practice most tags expect this text to contain one or more **space-separated** positional arguments, optionally followed by a set of options:

    ```rb
    @tag_name <arg_1> <arg_2> ... <arg_x> <opts?>
    ```

    The `@param` tag provides a good example of this in action:

    ```rb
    @param rating select { choices: [Bad, Good, Average] }
    ```

    In the above example the `@param` tag body will be parsed to extract the following information:

    |                  | name         | value                                     | type   |
    |------------------|--------------|-------------------------------------------|--------|
    | 1st argument     | `param_name` | `rating`                                  | String |
    | 2nd argument     | `field_type` | `select`                                  | String |
    | rest of tag body | `options`    | `{ choices: ["Bad", "Good", "Average"] }` | Hash   |
  <% end %>

  <% s.with_block_note :tip do %>
    Because tag arguments are _space-separated_, argument values that need to contain a space must be surrounded by double quotes:

    ```rb
    @tag_name first_arg "second value" third
    ```
  <% end %>
  <% s.with_block_subheading "Tag body parsing", id: "parsing" %>

  <% s.with_block_prose do %>
    By default, Lookbook will attempt to parse the tag body into a set of argument values and options.
    To make this possible an array of argument names (in the order which the values will appear in the tag body) needs be provided when defining a new tag.

    If your desired custom tag structure does not fit the standard format outlined above,
    then it is also possible to provide your own [custom parser](#custom-parser) to take full control of the process.
  <% end %>

<% end %>

<%= render section("Tag options", id: "options") do |s| %>
  <% s.with_block_prose do %>
    An (optional!) set of options can be provided at the end of the tag body content.

    Options can provided inline (as a YAML hash), imported from a JSON/YAML file or generated dynamically. Custom tag options are handled in exactly the same way as `@param` tag options so [check out the param options documentation](<%= guide_url :previews_params %>#param-options) for more detals on how they can be specified.

    The example below will use the simplest option - an inline, YAML-formatted hash.

    ```rb
    # @design figma https://share.figma.com/my-org/button-component { status: wip }
    ```

    The provided options hash can be accessed via the `.opts` property on `tag` objects:

    ```erb
    <a href="<%%= tag.design_file_url %>">
      <%%= tag.tool_name %>
      <%% if tag.opts.status == "wip" %>
        <strong>IN PROGRESS</strong>
      <%% end %>
    </a>
    ```
  <% end %>
<% end %>

<%= render section("Custom parsing logic", id: "custom-parser") do |s| %>
  <% s.with_block_prose do %>
    In some cases you may want to implement you own tag body parsing logic, to either replace or augment the standard parsing behavior.

    You can do this by providing a block to the `Lookbook.add_tag` method when adding a new tag.

    The block will receive a `tag` object as its only argument - the parser can access tag information from this and set arbitrary properties on this object for later use in templates.

    ```ruby
    Lookbook.add_tag(:new_tag) do |tag|
      # custom parser logic here...
    end
    ```

    ### Keywords example

    In this example, we will define a `@keywords` tag which allows for specifying a list of keywords in comma-separated list:

    ```
    @keywords marketing, email, webinar
    ```

    The standard parsing behaviour would not work here - it would attempt to parse each keyword as an argument value.

    Instead we can use some custom parsing logic to generate an array from the comma-separated list, and store it on the `tag` object for later reference.

    ```ruby
    Lookbook.add_tag(:keywords) do |tag|
      tag.keywords = tag.tag_body.split(",").map(&:strip)
    end
    ```

    ```erb
    The keywords for this preview are: <%%= tag.keywords.join(" | ") %>
    ```
  <% end %>
<% end %>