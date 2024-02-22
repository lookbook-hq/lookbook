Lookbook::Engine.routes.draw do
  root "inspector#index"

  get "/inspect/:preview", to: "inspector#preview", as: :inspect_preview
  get "/inspect/:preview/:scenario", to: "inspector#scenario", as: :inspect_scenario

  get "/previews/:preview/:scenario", to: "previews#scenario", as: :render_scenario

  resources :events, only: [:index]
end

Rails.application.routes.draw do
  get "#{Lookbook.config.mount_path}/render/:preview/:scenario",
    to: "#{Lookbook.config.preview_controller.sub(/Controller$/, "").underscore}#lookbook_render_scenario",
    as: :lookbook_render_scenario,
    internal: true
end
