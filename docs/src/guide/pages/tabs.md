---
layout: default
title: Tabbed Pages
---

It's possible to break up your page's content into multiple files and have the content from each file rendered as a set of tabs on the main page.

Tab page files should have the same name as the parent page, but with a suffix of `[insert-tab-name-here]` before the file extension.

For instance, in the example below, the `avatar` page will have 3 tabs ('design', 'mobile' & 'web') rendered below any content in the main avatar page.

```
test/components/docs/
  ├── 01_avatar.md.erb
  ├── 01_avatar[design].md.erb
  ├── 01_avatar[mobile].md.erb
  ├── 01_avatar[web].md.erb
```

> Tabs can contain embedded previews, code examples and can contain frontmatter, just like in regular pages.

By declaring the `label` frontmatter you can change the label shown on the tab:

```
---
label: Website
---
```

If you want the tabs in a different order, you can use the `position` frontmatter:

```
---
label: Website
position: 1
---
```

---