---
id: key-concepts
label: Key Concepts
title: Key Concepts
---

<%= render section("Components", id: "components") do |s| %>

  A component is a discrete, reusable 'chunk' of user interface such as a button or alert banner. 
  
  Lookbook **doesn't provide it's own system for authoring components**, but rather provides support for previewing components created using
  frameworks such as [ViewComponent](https://viewcomponent.org/) or [Phlex](https://phlex.fun),
  as well as for rendering previews of regular Rails [template partials](https://guides.rubyonrails.org/layouts_and_rendering.html#using-partials).

  [Read more about components &rarr;](<%= guide_url :components %>)
<% end %>

<%= render section("Preview classes", id: "previews") do |s| %>

  In order to preview a component in Lookbook it needs an associated **preview class**.

  Preview classes are created within the `test/components/previews` directory and extend the `Lookbook::Preview` (or `ViewComponent::Preview`) class.
  
  Previews can be organised into sub-directories as required and any organisational structure will be reflected in Lookbook's navigation.

  [Read more about preview classes &rarr;](<%= guide_url :previews %>)
<% end %>

<%= render section("Scenarios", id: "scenarios") do |s| %>
  
  Each **public method** defined in the preview class represents a unique **scenario** in which the target component is rendered using a particular set of arguments.
  This is roughly analagous to the concept of a 'story' in Storybook.
  
  Lookbook will generate an isolated component preview for each scenario.

  [Read more about scenarios &rarr;](<%= guide_url :previews %>#scenarios)

<% end %>

<%= render section("Annotations", id: "annotations") do |s| %>
  
  Annotations are comments added to preview classes that can be used to customise the preview experience and to provide extra information to end-users.

  [Read more about annotations &rarr;](<%= guide_url :annotations %>)

<% end %>

<%= render section("Pages", id: "pages") do |s| %>
  
  Lookbook's [Markdown-powered pages system](<%= guide_url :pages %>) allows for creating **long-form documentation** that lives alongside (and is tightly integrated with) component previews.

  [Read more about pages &rarr;](<%= guide_url :pages %>)
  
<% end %>