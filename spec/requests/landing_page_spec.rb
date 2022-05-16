require "rails_helper"

RSpec.describe "Landing page", type: :request do
  it "Shows the welcome message" do
    get lookbook_path
    expect(html).to have_css("#welcome-message")
  end
end
