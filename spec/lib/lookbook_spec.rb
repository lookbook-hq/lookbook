require "rails_helper"

RSpec.describe Lookbook do
  context "Data" do
    context ".data" do
      it "returns a Store instance" do
        expect(Lookbook.data).to be_a Lookbook::Store
      end
    end

    context ".data=" do
      it "overrides the existing data" do
        Lookbook.data.old_prop = true
        Lookbook.data = {
          new_prop: true
        }
        expect(Lookbook.data).to be_a Lookbook::Store
        expect(Lookbook.data.old_prop).to be nil
        expect(Lookbook.data.new_prop).to be true
      end
    end
  end

  context "Panels" do
    let(:panels_config) { Lookbook::Engine.panels }
    let(:default_group) { :drawer }

    context ".define_panel" do
      it "adds a panel without opts" do
        expect(panels_config).to receive(:add_panel).with("new-panel", default_group, "path/to/partial")
        Lookbook.define_panel("new-panel", "path/to/partial")
      end

      it "adds a panel with opts" do
        opts = {label: "A nice panel"}
        expect(panels_config).to receive(:add_panel).with("new-panel-2", default_group, "path/to/partial", opts)
        Lookbook.define_panel("new-panel-2", "path/to/partial", opts)
      end

      it "adds a panel with partial path set in opts" do
        opts = {partial: "path/to/partial"}
        expect(panels_config).to receive(:add_panel).with("new-panel-3", default_group, opts)
        Lookbook.define_panel("new-panel-3", opts)
      end
    end

    context ".amend_panel" do
      it "updates the panel with new opts" do
        opts = {label: "A nice panel"}
        expect(panels_config).to receive(:update_panel).with("panel-2", opts)
        Lookbook.amend_panel("panel-2", opts)
      end
    end

    context ".remove_panel" do
      it "removes the panel" do
        expect(panels_config).to receive(:remove_panel).with("panel-2")
        Lookbook.remove_panel("panel-2")
      end
    end
  end

  context "Inputs" do
    let(:inputs_config) { Lookbook::Engine.inputs }

    context ".add_param_input" do
      it "adds an input" do
        expect(inputs_config).to receive(:add_input).with("select", "path/to/partial")
        Lookbook.define_param_input("select", "path/to/partial")
      end

      it "adds an input with opts" do
        opts = {rows: 2}
        expect(inputs_config).to receive(:add_input).with("select", "path/to/partial", opts)
        Lookbook.define_param_input("select", "path/to/partial", opts)
      end
    end
  end

  context "Hooks" do
    let(:hooks_config) { Lookbook::Engine.hooks }

    context ".after_initialize" do
      it "adds an after_initialize hook" do
        callback = proc {}
        expect(hooks_config).to receive(:add_hook).with(:after_initialize, callback)
        Lookbook.after_initialize(&callback)
      end
    end

    context ".before_exit" do
      it "adds an before_exit hook" do
        callback = proc {}
        expect(hooks_config).to receive(:add_hook).with(:before_exit, callback)
        Lookbook.before_exit(&callback)
      end
    end

    context ".after_change" do
      it "adds an after_change hook" do
        callback = proc {}
        expect(hooks_config).to receive(:add_hook).with(:after_change, callback)
        Lookbook.after_change(&callback)
      end
    end
  end

  context "Tags" do
    let(:tags_config) { Lookbook::Engine.tags }

    context ".define_tag" do
      context "without block" do
        it "adds a tag" do
          args = [:one]
          expect(tags_config).to receive(:add_tag).with("foo", {
            named_args: args,
            args_parser: nil
          })

          Lookbook.define_tag("foo", args)
        end
      end

      context "with block" do
        it "adds a tag" do
          args = [:one]
          block = -> {}
          expect(tags_config).to receive(:add_tag).with("bar", {
            named_args: args,
            args_parser: block
          })
          Lookbook.define_tag("bar", args, &block)
        end
      end
    end
  end
end
