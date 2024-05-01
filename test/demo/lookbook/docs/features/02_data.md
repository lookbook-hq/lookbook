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

This is a test of frontmatter data access in pages.

The frontmatter for this page looks like this:

```yml
title: Using data from frontmatter
label: Frontmatter data
data:
  pets: 
    - type: cat
      sound: meow
    - type: dog
      sound: woof
```

Page templates have access to the data set in frontmatter:

```erb
<%% page.data.pets.each do |pet| %>
* A <%%= pet.type %> makes a '<%%= pet.sound %>' noise.
<%% end %>
```

This is the output:

<% page.data.pets.each do |pet| %>
* A <%= pet.type %> makes a '<%= pet.sound %>' noise.
<% end %>