class ResourceTypeConstraint
  def initialize(type)
    @type = type
    @param_key = @type.name.demodulize.downcase.to_sym
  end

  def matches?(request)
    resources(request.params[:collection]).include?(request.params[@param_key].to_param)
  end

  protected def resources(collection_id)
    # TODO: optimise/cache resources lookup
    collection = Lookbook::Collection.find(collection_id)
    collection ? collection.resources.map do |resource|
      resource.to_param if resource.is_a?(@type)
    end.compact : []
  end
end

Lookbook::Engine.routes.draw do
  root to: "start#index", as: :lookbook
  scope as: :lookbook do
    get ":collection", to: "collections#show", as: :collection

    scope ":collection" do
      constraints(ResourceTypeConstraint.new(Lookbook::Spec)) do
        get ":spec", to: "specs#show", as: :spec
        get ":spec/scenarios/:scenario", to: "scenarios#show", as: :scenario
      end

      constraints(ResourceTypeConstraint.new(Lookbook::Page)) do
        get ":page", to: "pages#show", as: :page
      end
    end
  end

  # if Lookbook::Engine.preview_embeds_allowed?
  #   # get "/embeds", to: "embeds#lookup", as: :lookbook_embed_lookup
  #   get "/embeds/:spec/:scenario", to: "embeds#scenario", constraints:, as: :lookbook_scenario_embed
  #   get "/embeds/:spec", to: "embeds#spec", constraints:, as: :lookbook_spec_embed
  # end

  # get "/events", to: "sse#index", as: :sse
end
