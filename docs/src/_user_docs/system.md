---
id: system-overview
label: How It Works
title: How It Works
---

<%= render section(overview: true) do |s| %>
  <% s.with_block_prose do %>
    This page aims to provide a high-level overview of Lookbook's **component preview system**.

    If you are new to Lookbook it's worth taking a few minutes to read this before diving deeper into the details
    of [components](<%= guide_url :components %>), [previews](<%= guide_url :previews %>) or [pages](<%= guide_url :pages %>).
  <% end %>
<% end %>


<%= render section("Preview system overview") do |s| %>

  <% s.with_block_prose do %>
    Let's step through the key parts of Lookbook's preview system in order to better understand how everything fits together.
  <% end %>

  <% s.with_block_subheading "Components", id: "components", step: 1 %>
  
  <% s.with_block_prose do %>
    Lookbook is designed to help with the component development process, but Lookbook doesn't actually know (or want to know) very much about the details of the components themselves.

    In fact, Lookbook is fairly **component-agnostic** - how your components are organised and what framework (if any) they are built on top of doesn't 
    really matter (at least to a certain extent - [more details here](<%= guide_url :components %>#types)).

    <%# This means that using Lookbook doesn't place any artificial constraints on how you develop your components - you are still **free to build your components in the way that best fits with your project**. %>
  <% end %>

  <% s.with_block_subheading "Previews", id: "previews", step: 2 %>
  
  <% s.with_block_prose do %>
    Instead of trying to reverse engineer information from components, Lookbook instead uses [preview classes](<%= guide_url :previews %>) as a way of explicitly 
    declaring which components should be made available to explore via the Lookbook UI.

    Each preview class is typically concerned with previewing a single component.
  <% end %>
  
<% end %>