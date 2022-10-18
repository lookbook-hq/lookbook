module Lookbook
  class Process
    attr_reader :env

    def initialize(env: Rails.env)
      @env = env
    end

    def supports_listening?
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
