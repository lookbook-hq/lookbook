class GroupComponentPreview < ViewComponent::Preview
  def default
    render StandardComponent.new do
      "ungrouped component content"
    end
  end

  # @!group

  def unnamed_group_first
    render StandardComponent.new do
      "first scenario in group"
    end
  end

  def unnamed_group_second
    render StandardComponent.new do
      "second scenario in group"
    end
  end

  # @!endgroup

  # @!group Named

  # @label First in named
  def named_group_first
    render StandardComponent.new do
      "first scenario in group"
    end
  end

  def named_group_second
    render StandardComponent.new do
      "second scenario in group"
    end
  end

  # @!endgroup

  # @!group Coercion

  # @param my_param [Symbol] select [foo, bar]
  def grouped_coerce(my_param: :foo)
    render StandardComponent.new do
      "my_param=#{my_param} class=#{my_param.class}"
    end
  end

  # @!endgroup
end
