class Elements::ListComponent < ViewComponent::Base
  renders_many :items, "ItemComponent"

  def call
    tag.ol do
      safe_join items
    end
  end

  class ItemComponent < ViewComponent::Base
    def call
      tag.li content
    end
  end
end
