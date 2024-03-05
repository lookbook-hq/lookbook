Lookbook::Engine.routes.draw do
  root "application#index"

  get "/previews/:preview", to: "previews#show", as: :show_preview
  get "/previews/:preview/:target", to: "previews#inspect", as: :inspect_target
  get "/previews/:preview/:target/preview", to: "previews#preview", as: :preview_target

  get "/debug", to: "debug#show", as: :debug

  resources :events, only: [:index]
end

Rails.application.routes.draw do
  get "#{Lookbook.config.mount_path}/render_scenario/:preview/:scenario",
    to: "#{Lookbook.config.preview_controller.sub(/Controller$/, "").underscore}#lookbook_render_scenario",
    as: :lookbook_render_scenario,
    internal: true
end
