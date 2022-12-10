---
id: installation
label: Installation
title: Installing Lookbook
---

These instructions cover installing Lookbook in your Rails project for the first time.

If you are already using Lookbook then head over to the [upgrade guide](<%= guide_url :upgrading %>) instead
for details on how to update your project to the latest version. 

<%= heading "1. Install the Lookbook gem", "install-gem", label: "1. Install gem", splitter: false %>

Add Lookbook to your `Gemfile`:

```ruby
group :development do
  gem "lookbook"
end
```

And then `bundle install` to install Lookbook.

<%= note :info do %>
  Lookbook can also be run in production - see [the deployment docs](<%= guide_url :deployment %>) for details on how to set that up.
<% end %>

<%= heading "2. Mount Lookbook in your app", "mount-lookbook", label: "2. Mount Lookbook", splitter: false %>

Next mount the Lookbook engine at a path of your choosing in your `config/routes.rb` file:

```ruby
Rails.application.routes.draw do
  if Rails.env.development?
    mount Lookbook::Engine, at: "/lookbook"
  end
end
```

The mount path (`/lookbook` in the example above) will be the URL that the Lookbook UI will be made accessible at within your app.

<%= heading "3. Install optional dependencies", "dependencies", label: "3. Optional dependencies", splitter: false %>

Lookbook requires the `listen` and `actioncable` gems to enable live-updating of the UI when changes are made to component or preview files.

These are optional dependencies - if they are not present the only difference is that you will need to manually refresh the Lookbook UI to see the changes.

Many Rails apps already include these gems. If your project doesn't you can enable Lookbook live UI updates by including them in the `:development` group in your `Gemfile`:

```ruby
group :development do
  gem "listen"
  gem "actioncable"
end
```

No additional configuration is needed once they are installed - Lookbook will detect they are present and enable live updates automatically.

<%= heading "4. Open the Lookbook UI", "ui", splitter: false %>

Once everything is installed, start your app as normal.

Assuming your app is running on port `3000` and you [mounted Lookbook](#mount-lookbook) at the path `/lookbook` then browse to [http://localhost:3000/lookbook](http://localhost:3000/lookbook) to view the Lookbook UI.

If this is a new project it will be pretty empty in there until you start [creating some previews &rarr;](<%= guide_url :previews %>) 



