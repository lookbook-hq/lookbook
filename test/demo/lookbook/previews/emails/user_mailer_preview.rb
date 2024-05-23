# Examples of rendering ActionMailer previews.
module Emails
  class UserMailerPreview < ActionMailer::Preview
    # @label Welcome email
    # @param user_name
    # @param body_text textarea
    # @param button_label
    def welcome(user_name: "Alice", body_text: default_body_text, button_label: "Click me")
      UserMailer.with(user_name: user_name, body_text: body_text, button_label: button_label).welcome
    end

    private

    def default_body_text
      <<-TEXT.strip
        Donec ut est finibus, sodales dui et, pulvinar ipsum. Vivamus euismod mi et egestas sollicitudin.

        Quisque dictum ornare augue, id interdum libero ullamcorper sed. Suspendisse molestie pulvinar interdum. Donec nec finibus dolor.

        Mauris nec nisl at tellus eleifend faucibus. In hendrerit non sapien eget lacinia.

      TEXT
    end
  end
end
