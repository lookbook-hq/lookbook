Lookbook::Engine.routes.draw do
  root to: "landing#show", as: :lookbook_landing

  get "/events", to: "events#index", as: :lookbook_event_stream

  get "/ui/partials/*partial", to: "ui/partials#show", as: :lookbook_partial

  scope "/inspect" do
    constraints subject: /[^\/]+/ do
      get "/:subject", to: "subjects#show", as: :lookbook_inspect_subject
      get "/:subject/:group", to: "groups#show", as: :lookbook_inspect_group
      get "/:subject/:group/:scenario", to: "scenarios#show", as: :lookbook_inspect_scenario
      get "/:subject/:group/:scenario/:panel", to: "panels#show", as: :lookbook_panel
    end
  end

  get "/*path", to: "errors#not_found", via: :all
end
