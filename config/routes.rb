Lookbook::Engine.routes.draw do
  root "landing#index"

  get "/@:uuid", to: "permalink#show", as: :permalink
  get "/previews", to: "previews#index", as: :previews
  get "/previews/:preview", to: "pages#preview", as: :preview_page
  get "/previews/:preview/:target", to: "previews#inspect", as: :inspect_target
  get "/previews/:preview/:target/preview", to: "previews#preview", as: :preview_target
  get "/previews/:preview/:target/embed", to: "previews#embed", as: :preview_embed

  get "/#{Lookbook.config.page_route}", to: "pages#index", as: :pages
  get "/#{Lookbook.config.page_route}/*path", to: "pages#page", as: :page

  get "/embed", to: "embeds#show", as: :embed

  resources :events, only: [:index]

  match "*path", to: "application#not_found", via: :all
end

Rails.application.routes.draw do
  get "#{Lookbook.config.mount_path}/render_scenario/:preview/:scenario",
    to: "#{Lookbook.config.preview_controller.sub(/Controller$/, "").underscore}#lookbook_render_scenario",
    as: :lookbook_render_scenario,
    internal: true
end
