# @label Custom
# @display max_width "500px"
# @display with_wrapper true
# @display foo_count 12
class AnnotatedComponentPreview < ViewComponent::Preview
  def default
    render BasicComponent.new
  end

  # @display bg_color "#fff"
  # @display foo_count 100
  def with_display_params
    render BasicComponent.new
  end

  # @hidden
  def hidden
    render BasicComponent.new
  end

  # @label Relabelled
  def labelled
    render BasicComponent.new
  end

  # Some notes about this example
  # Rendered with **markdown** and shouldn't
  # include any of the tags.
  #
  # @label Noted
  def with_notes
    render BasicComponent.new
  end

  # @!group Misc

  def misc_one
    render BasicComponent.new("Misc one")
  end

  def misc_two
    render BasicComponent.new("Misc two")
  end

  # @!endgroup

  # @!group

  def misc_three
    render BasicComponent.new("Misc three")
  end

  def misc_four
    render BasicComponent.new("Misc four")
  end

  # @!endgroup
end
