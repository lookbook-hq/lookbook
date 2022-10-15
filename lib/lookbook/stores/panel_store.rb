module Lookbook
  class PanelStore
    CONFIG_FILE = "config/panels.yml"

    DEFAULTS = {
      label: lambda { |data| data.name.titleize },
      hotkey: nil,
      disabled: false,
      show: true,
      copy: nil,
      locals: {}
    }

    attr_reader :store
    delegate :to_h, to: :store

    def initialize(config = nil)
      @store = {}
      load_config(config)
    end

    def add_panel(name, group_name, *args)
      if get_panel(name)
        raise ConfigError.new("panel with name '#{name}' already exists", scope: "panels.config")
      else
        panel = build_config(name, group_name, *args)
        insert_at_position(group_name, panel.position, panel)
      end
    end

    def update_panel(name, opts = {})
      panel = get_panel(name)
      if panel.present?
        panel.merge!(opts.except(:name, :position))
        if opts.key?(:position)
          remove_panel(name)
          insert_at_position(panel.group, opts[:position], panel)
        end
      else
        not_found!(name)
      end
    end

    def remove_panel(name)
      store.each do |group_name, panels|
        return true unless panels.reject! { |p| p.name == name.to_sym }.nil?
      end
      not_found!(name)
    end

    def load_config(config)
      config.to_h.each do |group_name, panels|
        panels.each do |opts|
          add_panel(opts[:name], group_name, opts.except(:name))
        end
      end
    end

    def get_panel(name, group_name = nil)
      panels(group_name).find { |p| p.name == name.to_sym }
    end

    def count_panels(group_name = nil)
      panels(group_name).count
    end

    def in_group(name)
      store[name.to_sym] ||= []
    end

    def panels(group_name = nil)
      store.to_h.reduce([]) do |result, (name, group_panels)|
        result.push(*group_panels) if group_name.nil? || name == group_name.to_sym
      end
    end

    def self.resolve_config(opts, data)
      if opts[:name].present?
        data = data.is_a?(Store) ? data : Store.new(data)
        data.name = opts[:name].to_s
        resolved = opts.transform_values do |value|
          value.respond_to?(:call) ? value.call(data) : value
        end
        Store.new(resolved)
      else
        raise ConfigError.new(":name key is required when resolving config", scope: "panels.config")
      end
    end

    def self.init_from_config
      new(default_config)
    end

    def self.default_config
      config = ConfigLoader.call(CONFIG_FILE)
      config.each do |group, panels|
        panels.map! do |opts|
          opts.transform_values! do |value|
            value.is_a?(String) && value.start_with?("->") ? eval(value) : value # standard:disable Security/Eval
          end
        end
      end
    end

    protected

    def insert_at_position(group_name, position, opts)
      group_panels = in_group(group_name)
      index = insert_index(position, group_panels.count)
      group_panels.insert(index, opts.except!(:position))
    end

    def insert_index(position, items_count)
      index = position == 0 ? 1 : (position || 0).to_int
      last_position = items_count + 1
      index = last_position if index > last_position
      index - 1
    end

    def build_config(name, group_name, *args)
      opts = if args.many? && args.last.is_a?(Hash)
        args.last.merge({partial: args.first})
      elsif args.any?
        args.first.is_a?(String) ? {partial: args.first} : args.first
      else
        {}
      end
      if opts[:partial].present?
        opts[:name] = name.to_sym
        opts[:group] = group_name.to_sym
        Store.new(DEFAULTS.merge(opts))
      else
        raise ConfigError.new("panels must define a partial path", scope: "panels.config")
      end
    end

    def not_found!(name)
      raise ConfigError.new("could not find panel named '#{name}'", scope: "panels.config")
    end
  end
end
