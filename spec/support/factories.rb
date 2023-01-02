FactoryBot.define do
  factory :class_code_object, class: "YARD::CodeObjects::ClassObject" do
    transient do
      file { Rails.root.join("scenario_class.rb") }
    end

    namespace { :root }
    name { :ExampleClass }

    after(:build) do |code_object, evaluator|
      if evaluator.file.present?
        code_object.add_file(evaluator.file)
      end
    end

    initialize_with { new(namespace, name) }

    factory :preview_code_object do
      transient do
        file { Rails.root.join("scenario_component_preview.rb") }
      end
      namespace { :root }
      name { :ExampleComponentPreview }
    end
  end

  factory :preview_tag, class: "YARD::Tags::Tag" do
    transient do
      file { nil }
    end

    tag_name { :scenario }
    name { "scenario" }
    types { [] }
    text { nil }

    after(:build) do |tag, evaluator|
      tag.object = build(:preview_code_object, file: evaluator.file)
    end

    initialize_with { new(tag_name, text, types, name) }

    factory :param_tag do
      tag_name { :param }
      name { "param_name" }
    end
  end
end
