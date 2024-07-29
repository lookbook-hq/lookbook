module Views::Phlex
  class CardExample < Phlex::HTML
    def template(&content)
      div class: "card", &content
    end

    def footer(&content)
      div class: "card-footer", &content
    end
  end
end
