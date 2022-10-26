require "rails_helper"

RSpec.describe Lookbook::EvalResolver do
  let(:valid_input) { "{{ get_data }}" }
  let(:invalid_input) { "{{ asdasd }}" }
  let(:unmatched_input) { "asdasd" }

  it_behaves_like "eval resolver"
end
