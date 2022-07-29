---
layout: default
title: Embedding Previews
---

You can embed preview examples from your project directly into the documentation pages using the [embed helper](/guide/pages/variables#method-embed), which renders an iframe with the rendered preview in it at any point in your document.

The output looks like this:

{{ image "embedded_preview.png" }}

## Usage

To specify which preview example to render, the helper accepts a preview class and a method name (as a symbol), like this:

```erb
<%= embed Elements:ButtonComponentPreview, :default %>
```

This will generate a preview for the `default` example method of the `Elements:ButtonComponentPreview` preview class.

## Preview params

If you have configured your examples to accept [preview params](/guide/previews/params), then you can supply values for those params when rendering the embedded preview:

```erb
<%= embed Elements:ButtonComponentPreview, :default, params: {
  icon: "plus",
  text: "Add new"
} %>
```

{{toc}}