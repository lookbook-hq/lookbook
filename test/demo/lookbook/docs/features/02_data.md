---
title: Using data from frontmatter
label: Frontmatter data
data:
  pets: 
    - type: cat
      sound: meow
    - type: dog
      sound: woof
---

This is a test of arbitrary frontmatter data access in pages.

<% @page.data.pets.each do |pet| %>
* A <%= pet.type %> makes a '<%= pet.sound %>' noise.
<% end %>