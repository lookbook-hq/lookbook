class OrderedComponentPreview < ViewComponent::Preview
  def ggg
    render StandardComponent.new title: "default" do
      "first example"
    end
  end

  def zzz
    render StandardComponent.new do
      "second example"
    end
  end

  def aaa
    render StandardComponent.new do
      "last example"
    end
  end
end
