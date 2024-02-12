Rails.application.config.app_middleware.use(
  Rack::Static,
  urls: [Lookbook.env.development? ? "/lookbook-dev" : "/lookbook-assets"],
  root: Lookbook::Engine.root.join("public").to_s
)
