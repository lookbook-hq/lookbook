class UserMailer < ApplicationMailer
  def welcome
    @user_name = params[:user_name]
    mail(to: "user@example.com", subject: "Welcome")
  end
end
