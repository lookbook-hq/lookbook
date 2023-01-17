---
id: previews-groups
title: Grouping Previews
---

<%= render section(overview: true) do |s| %>
  By default, each [scenario](<%= guide_url :previews %>#scenarios) will be listed in the navigation and will be rendered on its own in the inspector.

  However for previews of small components that may have many scenarios defined (e.g. an icon component with a scenario per available icon)
  it often makes more sense to group some or all of them so that they are all rendered together in a single preview.
<% end %>

<%= render section("When to use groups", id: "when-to-use") do |s| %>
  <% s.with_block_prose do %>
    The following `Header` component preview contains four scenarios:

    ```ruby
    class HeaderComponentPreview < ViewComponent::Preview
      def small
        render HeaderComponent.new(size: 20) do
          "Small header"
        end
      end
      
      def medium
        render HeaderComponent.new(size: 30) do
          "Medium header"
        end
      end
      
      def big
        render HeaderComponent.new(size: 44) do
          "Big header"
        end
      end
      
      def long_text
        render HeaderComponent.new do
          "This is a header with some long text within it that keeps on going on"
        end
      end
    end
    ```

    By default each of these will get its own navigation item and standalone preview:

    [TODO: INSERT UNGROUPED EXAMPLE IMAGE HERE]

    However, in this example it's not really necessary for each size-related scenario to have it's own preview,
    and indeed it may be better to show them grouped together to better understand their relative sizes.

    Using the `@!group ... @!endgroup` comment tags the 'size' scenarios can be grouped so that they are all rendered in a single preview:

    ```ruby
    class HeaderComponentPreview < ViewComponent::Preview
      # @!group Sizes
      
      def small
        render HeaderComponent.new(size: 20) do
          "Small header"
        end
      end 
      
      def medium
        render :HeaderComponent.new(size: 30) do
          "Medium header"
        end
      end
      
      def big
        render HeaderComponent.new(size: 44) do
          "Big header"
        end
      end

      # @!endgroup
      
      def long_text
        render HeaderComponent.new do
          "This is a header with some long text within it that keeps on going on"
        end
      end
    end
    ```

    The three size-related scenarios are now rendered together, while the scenario that was not included in the group still has its own navigation item and standalone preview:

    [TODO: INSERT GROUPED SCENARIO IMAGE HERE]

  <% end %>
<% end %>

<%= render section("Adding groups", id: "adding") do |s| %>
  <% s.with_block_prose do %>
    As shown in the example above, scenarios are grouped within a preview class by adding a `@!group` comment tag above the first scenario in the group, and an `@!endgroup` tag after the last one.

    You can specify an optional `label` for the group (for use in the nav) - if this is omitted the name of the first scenario in the group will be used to generate the label.

    ```ruby
    @!group <label>
    ```

    ```ruby
    class ExampleComponentPreview < ViewComponent::Preview
      # @!group Some Nice Examples

      def first_scenario
        # ...
      end 

      def second_scenario
        # ...
      end 

      # @!endgroup
    end
    ```

    ## Multiple groups

    You can have as many groups as you like within a single preview class, but each scenario can only belong to one group.

    ```ruby
    class ExampleComponentPreview < ViewComponent::Preview
      # @!group First Group

      def first_scenario
        # ...
      end 

      def second_scenario
        # ...
      end 

      # @!endgroup

      # @!group Second Group

      def third_scenario
        # ...
      end 

      def fourth_scenario
        # ...
      end 

      # @!endgroup

      def not_in_a_group
        # ...
      end 
    end
    ```
  <% end %>
<% end %>

<%= render section("Grouping all scenarios", id: "grouping-all") do |s| %>
  <% s.with_block_prose do %>

    If **all** the scenarios in a preview class are grouped into a single group
    then the group itself will not show in the navigation, only the nav item representing the preview class.
    Clicking on this will display the grouped scenarios.

    In this case, the group `<label>` (if specified) has no effect, but the preview label can still be customised via the [`@label` tag](<%= guide_url :previews_navigation %>#label)

    [TODO: INSERT ALL GROUPED IMAGE HERE]

  <% end %>
<% end %>

<%= render section("Customising group rendering", id: "customising") do |s| %>
  <% s.with_block_prose do %>

    If you wish to customise the way that the grouped scenarios are displayed in the preview,
    you can override Lookbook's default rendered output template.

    To do so, create a new view template within your app at `./app/views/lookbook/preview.html.erb`.
    This is the template that will now be used to render all Lookbook previews (not just grouped ones!).

    The default template looks as follows, and is worth using as a starting point:

    ```erb
    <%% if scenarios.many? %>
      <!-- Render a group of scenarios -->
      <%% scenarios.each do |scenario| %>
        <div style="margin-bottom: 30px !important; display: block !important;">
          <h6 style="all: unset; display: block; color: #999; font-family: sans-serif; font-size: 14px; margin-top: 0; margin-bottom: 10px;">
            <%%= scenario.label %>
          </h6>
          <%%= scenario.output %>
        </div>
      <%% end %>
    <%% else %>
      <!-- Render a single scenario -->
      <%%= scenarios.first.output %>
    <%% end %>
    ```

    As you can see it needs to handle both the case where a single example is being rendered,
    and the case when multiple (i.e. grouped) examples are being rendered together.

    This will be rendered in the context of your own [application/preview layout](/guide/previews/layout/)
    so you are free to use any CSS styles or classes that your app provides, rather than the inline styles in the 
    default template contents.

  <% end %>
<% end %>
