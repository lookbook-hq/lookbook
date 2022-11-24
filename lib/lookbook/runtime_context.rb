module Lookbook
  class RuntimeContext
    attr_reader :env

    def initialize(env: Rails.env)
      @env = env
    end

    def actioncable_installed?
      gem_installed?("actioncable")
    end

    def listen_installed?
      gem_installed?("listen")
    end

    def gem_installed?(name)
      Gem.loaded_specs.has_key?(name)
    end

    def web?
      !rake_task? && !Rails.const_defined?(:Console)
    end

    def rake_task?
      if defined?(Rake) && Rake.respond_to?(:application)
        File.basename($0) == "rake" || Rake.application.top_level_tasks.any?
      else
        false
      end
    end
  end
end
