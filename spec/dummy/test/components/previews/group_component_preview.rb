class GroupComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new do
      "ungrouped component content"
    end
  end

  # @!group

  def unnamed_group_first
    render StandardComponent.new do
      "first example in group"
    end
  end

  def unnamed_group_second
    render StandardComponent.new do
      "second example in group"
    end
  end

  # @!endgroup

  # @!group Named

  # @label First in named
  def named_group_first
    render StandardComponent.new do
      "first example in group"
    end
  end

  def named_group_second
    render StandardComponent.new do
      "second example in group"
    end
  end

  # @!endgroup
end
