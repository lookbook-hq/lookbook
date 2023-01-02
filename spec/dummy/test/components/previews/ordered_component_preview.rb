class OrderedComponentPreview < ViewComponent::Preview
  def ggg
    render StandardComponent.new title: "default" do
      "first scenario"
    end
  end

  def zzz
    render StandardComponent.new do
      "second scenario"
    end
  end

  def aaa
    render StandardComponent.new do
      "last scenario"
    end
  end
end
