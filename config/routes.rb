Lookbook::Engine.routes.draw do
  root "application#index"

  get "/previews/:preview", to: "previews#show", as: :show_preview
  get "/previews/:preview/:target", to: "previews#inspect", as: :inspect_target
  get "/previews/:preview/:target/preview", to: "previews#preview", as: :preview_target
  get "/previews/:preview/:target/embed", to: "previews#embed", as: :preview_embed

  get "/#{Lookbook.config.page_route}/*path", to: "pages#show", as: :show_page

  get "/embed", to: "embeds#show", as: :embed

  resources :events, only: [:index]
end

Rails.application.routes.draw do
  get "#{Lookbook.config.mount_path}/render_scenario/:preview/:scenario",
    to: "#{Lookbook.config.preview_controller.sub(/Controller$/, "").underscore}#lookbook_render_scenario",
    as: :lookbook_render_scenario,
    internal: true

  get "#{Lookbook.config.mount_path}/render_page/:path",
    to: "#{Lookbook.config.page_controller.sub(/Controller$/, "").underscore}#lookbook_render_page",
    as: :lookbook_render_page,
    internal: true
end
