Rails.application.routes.draw do
  get "lookbook/previews/:spec/:scenario",
    to: "lookbook_preview#show",
    as: :lookbook_preview,
    internal: true
end

Lookbook::Engine.routes.draw do
  root to: "start#index", as: :lookbook

  scope as: :lookbook do
    get "collections/:collection", to: "collections#show", as: :collection

    get "specs/:spec", to: "specs#show", as: :spec
    get "specs/:spec/scenarios/:scenario", to: "scenarios#show", as: :scenario

    get "pages/:page", to: "pages#show", as: :page

    get "events", to: "sse#index", as: :events

    # TODO: routes for embeds
  end
end
