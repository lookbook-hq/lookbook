class ParamComponentPreview < ViewComponent::Preview
  
  # @param blurb
  def default_input(blurb: "default text")
    render ParamComponent.new(blurb: blurb)
  end

  # @param blurb text
  def text_input(blurb: "default text")
    render ParamComponent.new(blurb: blurb)
  end

  # @param blurb textarea
  def textarea_input(blurb: "default text")
    render ParamComponent.new(blurb: blurb)
  end

  # @param blurb select [option one, option two]
  def select_input(blurb: "option one")
    render ParamComponent.new(blurb: blurb)
  end

end
