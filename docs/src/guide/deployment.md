---
layout: default
title: Deploying to Production
---

Lookbook is intended to be a tool for aiding the ViewComponent development process, and so is usually restricted to running only when the app is in `development` mode.

However, it is possible to run Lookbook in a production environment if you wish.

{%= note :info do %}
**Please note!** If you choose to run Lookbook in production, you do so at your own risk.
It is primarily intended as a development tool and has not yet been thoroughly battle-tested in production environments.
{% end %}

## Configuration changes for production

You will need to make sure that the following configuration changes have been made when deploying to production:

**Ensure ViewComponent is [configured to show previews in production](https://viewcomponent.org/api.html#show_previews)** (by default it is disabled when not in development):

```ruby
# config/environments/production.rb
config.view_component.show_previews = true
```

**Remove any environment checking from around the Lookbook mounting declaration** (if added as per install instructions):

```ruby
# config/routes.rb
Rails.application.routes.draw do
  # if Rails.env.development? <- remove
    mount Lookbook::Engine, at: "/lookbook"
  # end
end
```

---

{{toc}}