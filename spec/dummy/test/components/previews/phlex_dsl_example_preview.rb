class PhlexDslExamplePreview < Lookbook::PhlexPreview
  def default
    render Views::Phlex::CardExample.new do |card|
      h1 { "My card" }

      div class: "card-body" do
        render Views::Phlex::ListExample.new do |list|
          list.item { "Hello" }
          list.item { "World" }
        end
      end

      card.footer do
        span { "Hey ya!" }
      end
    end
  end
end
