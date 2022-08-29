---
layout: default
title: Extension APIs
---

## Custom Tags

_See the [custom tags](/guide/extend/tags/) section in the guide for more information._

{{ render "methods_list", methods: site.data.tags[:methods] }}

---

## Inspector Panels

_See the [inspector panels](/guide/extend/panels/) section in the guide for more information._

{{ render "methods_list", methods: site.data.panels[:methods] }}

### Panel Options

{{ render "options_list", options: site.data.panels[:options] }}

---

## Lifecycle Hooks

_See the [hooks section](/guide/extend/hooks/) in the guide for more information._

{{ render "methods_list", methods: site.data.hooks }}

