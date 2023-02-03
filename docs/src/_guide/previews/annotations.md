---
id: previews-annotations
label: Using Annotations
title: Using Annotations
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    It is possible to customise certain aspects of component previews using [Yard-style](https://rubydoc.info/gems/yard/file/docs/Tags.md) comment annotations in the source code.

    Annotations can be added at the class (preview) or method (scenario) level, and can contain a mix of [text content](#notes) and [tags](#tags).
  <% end %>

  <% s.with_block_note :link do %>
    The [tags reference page](<%= guide_url :tags_reference %>) has details on all of the tags that are available for use.
  <% end %>
<% end %>

<%= render section("Annotated preview file example", id: "example") do |s| %>
  <% s.with_block_prose do %>
    Below is an example of a preview file containing annotations.

    ```ruby
    # @label Basic Button
    # @display bg_color "#fff"
    class ButtonComponentPreview < Lookbook::Preview

      # Primary button
      # ---------------
      # This is the button style you should use for most things.
      #
      # @label Primary
      def default
        render ButtonComponent.new do
          "Click me"
        end
      end

      # Button with icon
      # ----------------
      # This example uses dynamic preview parameters
      # which can be edited live in the Lookbook UI
      #
      # @param text
      # @param icon select [heart, cog, alert]
      def icon(text: "Spread the love", icon: "heart")
        render ButtonComponent.new(icon: icon) do
          text
        end
      end

      # Inverted button
      # ---------------
      # For light-on-dark screens
      #
      # @display bg_color "#000"
      def secondary
        render ButtonComponent.new(style: :inverted) do
          "Click me"
        end
      end

      # Unicorn button
      # ---------------
      # This button style is still a **work in progress**
      # and so has been hidden from the navigation.
      #
      # @hidden
      def unicorn
        render ButtonComponent.new do
          "Click me"
        end
      end

      # @!group More examples

      def short_text
        render ButtonComponent.new do
          "Go"
        end
      end

      def long_text
        render ButtonComponent.new do
          "Click here to do this thing because it's the best way to do it"
        end
      end

      def emoji_text
        render ButtonComponent.new do
          "👀📗"
        end
      end

      # @!endgroup
    end
    ```
  <% end %>
<% end %>

<%= render section("Tags", id: "tags") do |s| %>
  <% s.with_block_prose do %>
    Tags are lines of structured text identified by their `@` prefix - for example `@hidden`.
    They provide extra information to Lookbook about how to render the preview or represent items in the navigation.

    In the following example, the preview class has one tag applied to it (`@label`) and the `#icon` method has two (`@display` and `@param`)

    ```rb
    # @label Basic Button
    class ButtonComponentPreview < Lookbook::Preview
      # @display bg_color red
      # @param icon select [heart, cog, alert]
      def icon(icon: "heart")
        render ButtonComponent.new(icon: icon) do
          "Spread the love"
        end
      end
    ```
  <% end %>

  <% s.with_block_note :info do %>
    The [tags reference page](<%= guide_url :tags_reference %>) contains a **full list of all available tags**, and the other pages in this section explore some of the tags and their usage in more detail.
  <% end %>
<% end %>

<%= render section("Notes", id: "notes") do |s| %>
  <% s.with_block_prose do %>
    All comment text other than tags will be treated as Markdown and rendered in the **Notes** panel for that preview in the Lookbook UI.

    ```ruby
    class ProfileCardComponentPreview < Lookbook::Preview 

      # Profile Card
      # ------------
      # Use the default profile card component whenever you need to represent a user.
      #
      # All this text will be included in the Notes panel for this preview.
      def default
      end
    end
    ```
  <% end %>
<% end %>