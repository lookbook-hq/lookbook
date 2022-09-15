---
layout: default
title: Lookbook Overview
---

Lookbook is a tool to help develop, test and document [ViewComponents](https://viewcomponent.org) in isolation.

It provides a UI to let you browse your component library and preview your components alongside code samples and documentation.

Lookbook is built on top of ViewComponent's native [preview classes](https://viewcomponent.org/guide/previews.html) so works out-of-the-box for new and existing projects alike.

{%= note :info do %}
**This documentation is for Lookbook v1.0+**. Documentation for older releases can be found in the [0.9.x branch of the Lookbook repo &rarr;](https://github.com/allmarkedup/lookbook/tree/0.9.x)
{% end %}

{{ image "lookbook_inspector_screenshot.png" }}

## Lookbook v1.0 - Changes and new features

Lookbook v1.0 includes a completely re-written UI, many under-the hood improvements and a some exciting new customisation options.

### Frontend changes:

* Completely re-written UI - now built with ViewComponents
* New [UI themes and customisation options](/guide/themes/)
* Improved small-screen/mobile view
* Debug menu
* ...and many other small visual and usability improvements

### New options for extending Lookbook:

* Define [custom tags](/guide/extend/tags/) for preview file annotations
* Create [your own tab panels](/guide/extend/panels/) - with complete control over content/layout and access to all Lookbook data
* Use [lifecycle hooks](/guide/extend/hooks/) to run your own code when Lookbook starts up, when files change or at shutdown

### Other changes

* 'Workbench' app for developing Lookbook's UI components in Lookbook
* New Rspec-based test suite and dummy app
* All new documentation site (this one!) built using [Bridgetown](https://www.bridgetownrb.com/)

---


## Lookbook Demo

If you want to have a quick play with Lookbook, the easiest way is to [give the demo app]({{ site.data.external.demo.url }}) a spin. It's a basic Rails/ViewComponent app with a few test components included to tinker with.

[{{ site.data.external.demo.url }}]({{ site.data.external.demo.url }})

If you'd rather dig in a bit more and run the demo app locally, the [demo repo]({{ site.data.external.demo.repo }}) contains instructions on how to get it up and running.

## Who uses Lookbook?

* [Clio](https://www.clio.com/)
* [CoverageBook](https://coveragebook.com/)
* [FreeAgent](https://www.freeagent.com/)
* [Within3](https://within3.com/)
* And [many more...](https://github.com/allmarkedup/lookbook/network/dependents?package_id=UGFja2FnZS0xMDM0MzQ1)

Using Lookbook? [Send a pull request](https://github.com/allmarkedup/lookbook/edit/main/docs/src/guide/index.md) to update this list!

{{ toc }}
