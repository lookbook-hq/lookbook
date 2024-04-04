class UserMailerPreview < ActionMailer::Preview
  def welcome
    UserMailer.with(user_name: "Bob").welcome
  end

  # @param user_name
  def playground(user_name: "Alice")
    UserMailer.with(user_name: user_name).welcome
  end
end
