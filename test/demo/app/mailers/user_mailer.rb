class UserMailer < ApplicationMailer
  def welcome
    @user_name = params[:user_name]
    @body_text = params[:body_text]
    @button_label = params[:button_label]
    mail(to: "user@example.com", subject: "Welcome")
  end
end
