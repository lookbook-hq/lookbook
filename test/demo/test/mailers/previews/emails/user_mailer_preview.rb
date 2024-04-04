# Examples of rendering ActionMailer previews.
module Emails
  class UserMailerPreview < ActionMailer::Preview
    # @label Welcome email
    # @param user_name
    def welcome(user_name: "Alice")
      UserMailer.with(user_name: user_name).welcome
    end
  end
end
