# Lookbook v3 alpha

## Background and motivation

The current Lookbook codebase has grown organically and haphazardly from a few custom ViewComponent preview templates into a standalone Rails Engine gem with support for previewing many different types of components and views.

In order to provide a solid foundation for future development this v3 branch was created with aspirations to improve the quality of the Lookbook codebase, reduce the number of third party dependencies, fix long-standing issues that are hard to address in the current implementation
and explore building out new (and experimental) feature ideas.

More concretely, a number of **key goals** are helping shape the development work:

## UI

* Improve accessibilty and usability of the app (#17)
* Expose a better theming system using CSS variables (with light and dark modes out of the box)
* Replace ViewComponent dependency with bespoke component system for building the UI

## Previews

* Add support for ActionMailer previews (#570)
* Implement customisable preview overview/documentation pages
* Add support for customisable ordering + renaming of folders/previews in nav (#125)
* Fix compatability issues with partial/view template previews (#581, #555)
* Improve handling and logging of parser errors (#593)

#### Preview embeds

* Add more granualar security configuration options for embed iframes (#571)
* Implement `<lookbook-embed></lookbook-embed>` as a native web component

#### Pages

* Make it easier to customise the look and feel of pages
* Implement a better system for ordering folders/pages in nav
* Expand set of UI and path helpers available in pages

#### Development/Testing

* Streamline Lookbook development process - runnable test/demo/development app, simpler asset dev/build pipeline
* Improve test setup - switch to Minitest, run tests against demo app, better integration test coverage
* Make logging play nicer with standard Rails logging options and third party gems

#### Other

* Remove ActionCable requirement, use SSE for live UI updates in dev
* Improve error handling and compatability with `better_errors` etc (#528)
* Remove some of the madness from codebase 🙈