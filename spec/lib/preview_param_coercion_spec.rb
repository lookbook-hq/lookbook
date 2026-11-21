require "rails_helper"

RSpec.describe Lookbook::PreviewParamCoercion do
  # Symbol keys throughout: both preview base classes slice provided params by
  # the scenario method's symbol parameter names, so a plain string-keyed Hash
  # never reaches the scenario. String-key handling is covered by the
  # ParamsCoercer specs; the permitted ActionController::Parameters case below
  # is the shape the ViewComponent preview controller actually passes.
  def rendered(preview_class, scenario, params)
    preview_class.render_args(scenario, params: params)[:block].call
  end

  describe "#render_args" do
    it "casts raw string values to the declared param type" do
      expect(rendered(ParamsComponentPreview, :coerce_symbol, {my_param: "bar"})).to include("class=Symbol")
    end

    it "leaves already-cast values untouched (idempotent)" do
      expect(rendered(ParamsComponentPreview, :coerce_symbol, {my_param: :bar})).to include("my_param=bar class=Symbol")
    end

    it "casts permitted ActionController::Parameters with string keys" do
      params = ActionController::Parameters.new("my_param" => "bar").permit!

      expect(rendered(ParamsComponentPreview, :coerce_symbol, params)).to include("class=Symbol")
    end

    it "casts mixed types in one scenario" do
      output = rendered(ParamsComponentPreview, :coerce_mixed, {sym: "bar", flag: "true", num: "3"})

      expect(output).to include("sym=Symbol", "flag=TrueClass", "num=Integer")
    end

    it "casts scenarios declared inside an @!group" do
      expect(rendered(GroupComponentPreview, :grouped_coerce, {my_param: "bar"})).to include("class=Symbol")
    end

    it "casts params for Lookbook::Preview subclasses" do
      expect(rendered(ViewComponentExamplePreview, :coerce_symbol, {my_param: "bar"})).to include("class=Symbol")
    end

    it "passes params through unchanged for a preview class the registry does not know" do
      stub_const("UnregisteredPreview", Class.new(ViewComponent::Preview) do
        # @param my_param [Symbol]
        def coerce_symbol(my_param: :foo)
          render(StandardComponent.new) { "class=#{my_param.class}" }
        end
      end)

      expect(rendered(UnregisteredPreview, :coerce_symbol, {my_param: "bar"})).to include("class=String")
    end

    it "evaluates an inferred default at most once per scenario across renders" do
      ParamsComponentPreview.render_args(:coerce_counted_string, params: {label: "x"})

      expect { ParamsComponentPreview.render_args(:coerce_counted_string, params: {label: "y"}) }
        .not_to change(ParamsComponentPreview, :string_default_evaluations)
    end

    it "does not consult the preview registry on the render path once installed" do
      allow(Lookbook::Engine).to receive(:previews).and_call_original

      ParamsComponentPreview.render_args(:coerce_symbol, params: {my_param: "bar"})

      expect(Lookbook::Engine).not_to have_received(:previews)
    end

    context "when a value cannot be cast to the declared type" do
      it "passes the raw value through and logs a warning" do
        logger = instance_double(Logger, debug: nil, warn: nil)
        allow(Lookbook).to receive(:logger).and_return(logger)

        output = rendered(ParamsComponentPreview, :coerce_hash, {config: "not-a-yaml-hash"})

        expect(output).to include("config=String")
        expect(logger).to have_received(:warn).with(/Param coercion failed for 'config'/)
      end
    end
  end

  describe ".install" do
    it "is prepended on the ViewComponent::Preview base class" do
      expect(ViewComponent::Preview.singleton_class).to include(described_class)
    end

    it "is prepended on the Lookbook::Preview base class" do
      expect(Lookbook::Preview.singleton_class).to include(described_class)
    end

    it "caches a coercer per scenario on registered preview classes" do
      coercers = ParamsComponentPreview.instance_variable_get(:@_lookbook_param_coercers)

      expect(coercers.keys).to include("coerce_symbol", "coerce_mixed")
      expect(coercers.values).to all(be_a(Lookbook::ParamsCoercer))
    end

    it "caches coercers for grouped scenarios under the scenario name" do
      coercers = GroupComponentPreview.instance_variable_get(:@_lookbook_param_coercers)

      expect(coercers).to have_key("grouped_coerce")
    end

    it "refreshes the cache when the registry reloads" do
      ParamsComponentPreview.instance_variable_set(:@_lookbook_param_coercers, {})

      Lookbook::Engine.load_previews

      coercers = ParamsComponentPreview.instance_variable_get(:@_lookbook_param_coercers)
      expect(coercers).to have_key("coerce_symbol")
    end
  end
end
