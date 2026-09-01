class ViewComponentExamplePreview < Lookbook::Preview
  def default
    render BasicComponent.new
  end

  # @param my_param [Symbol] select [foo, bar]
  def coerce_symbol(my_param: :foo)
    render StandardComponent.new do
      "my_param=#{my_param} class=#{my_param.class}"
    end
  end
end
