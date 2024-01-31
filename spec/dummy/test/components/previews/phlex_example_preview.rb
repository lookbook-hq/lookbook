class PhlexExamplePreview < Lookbook::Preview
  def default
    render Views::Phlex::BasicExample.new
  end

  def helpers
    render Views::Phlex::HelpersExample.new
  end

  def builder
    render Views::Phlex::ListExample.new do |list|
      list.item { "Hello" }
      list.item { "World" }
    end
  end

  def phlex_dsl
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
