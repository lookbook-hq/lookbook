class ParamComponent < ViewComponent::Base
  def initialize(blurb: nil, conditional: false, count: 0, choice: :default)
    @blurb = blurb
    @conditional = conditional
    @count = count
    @choice = choice
  end

  def blurb
    throw "`blurb` param is not a string" unless @blurb.is_a? String
    @blurb
  end

  def conditional
    throw "`conditional` param is not a boolean" unless @conditional == false || @conditional == true
    @conditional
  end

  def count
    throw "`count` param is not an integer" unless @count.is_a? Integer
    @count
  end

  def choice
    throw "`choice` param is not a symbol" unless @choice.is_a? Symbol
    @choice
  end
end
