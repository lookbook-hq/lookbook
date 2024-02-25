Lookbook::Engine.routes.draw do
  root "application#index"

  get "/previews/:preview", to: "previews#overview", as: :preview_overview
  get "/previews/:preview/:target", to: "inspector#inspect", as: :inspector
  get "/previews/:preview/:target/render", to: "inspector#preview", as: :inspector_preview

  resources :events, only: [:index]
end

Rails.application.routes.draw do
  get "#{Lookbook.config.mount_path}/render_scenario/:preview/:scenario",
    to: "#{Lookbook.config.preview_controller.sub(/Controller$/, "").underscore}#lookbook_render_scenario",
    as: :lookbook_render_scenario,
    internal: true
end
