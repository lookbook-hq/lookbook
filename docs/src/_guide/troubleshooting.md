---
id: troubleshooting
title: Troubleshooting
---


<%= render section(overview: true) do |s| %>
  Below is a collection of solutions for (or workarounds to) some some common issues that people run into when using Lookbook.

  If you are having problems and nothing here helps then head over to the
  [Lookbook repo](<%= links.repo %>) and open an issue or discussion to get help from the community.
<% end %>

<%= render section("Template error in preview window", id: "link-to-template-error") do |s| %>
  <% s.with_block_prose do %>

    When previewing components, if you are seeing an `ActionView::Template::Error` error with (something similar to) the following message:

    ```
    No route matches {:action=>"preview", :controller=>"lookbook/previews", :path=>"path_to/current_component"}
    ```

    Then it may be being caused by the use of `link_to` tag helpers in your preview layout (if you have specified one) or your application layout.

    Due to the way Lookbook renders the layout, some forms of `link_to` arguments do not currently work and will cause the error described above.

    To fix the issue you can either use one of the `link_to` forms that work (see below) or remove the links from your layout
    (and perhaps [use a preview-specific layout](<%= guide_url :previews_layouts %>) if you are currently using the default application layout).

    ```erb
    <%%= link_to "Click here", "/foo/bar" %>  ✅ works
    <%%= link_to "Click here", edit_thing_path(@thing.id) %>  ✅ works
    <%%= link_to "Click here", locale: :en %>  ❌ doesn't work
    <%%= link_to "Click here", controller: "demo", action: "index" %>  ❌ doesn't work
    ```
  <% end %>
<% end %>