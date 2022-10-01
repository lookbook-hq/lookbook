module Lookbook
  class TagOptions
    SYMBOL_MATCH = /(:([a-zA-Z_\d]+))$/
    EVAL_OPTION_MATCH = /(\{\{\s?(.*)\s?\}\})$/
    YAML_HASH_MATCH = /(\{(.*?)\})$/m
    YAML_ARRAY_MATCH = /(\[(.*?)\])$/m
    FILE_PATH_MATCH = /(\S+\.(json|yml))$/

    MATCHERS = [YAML_ARRAY_MATCH, YAML_HASH_MATCH, SYMBOL_MATCH, EVAL_OPTION_MATCH, FILE_PATH_MATCH]

    def initialize(options_str, eval_scope: nil, base_dir: nil)
      @options_str = options_str.is_a?(String) ? options_str.strip : ""
      @eval_scope = eval_scope
      @base_dir = base_dir
    end

    def options
      resolve.is_a?(Hash) ? resolve.symbolize_keys : resolve
    end

    def resolve
      @resolved_options ||= begin
        if @options_str.present?
          if @options_str.end_with?(".json", ".yml")
            file_path = resolve_file_path
            if file_path
              options_file_content = File.read(file_path)
            else
              raise "Tag options data file not found"
            end
          end
          if file_path&.extname == ".json"
            JSON.parse(options_file_content)
          elsif file_path&.extname == ".yml"
            YAML.safe_load(options_file_content)
          elsif evaluatable?
            evaluate
          else
            YAML.safe_load(@options_str || "{}")
          end
        else
          {}
        end
      rescue => exception
        Lookbook.logger.warn Lookbook::Error.new(exception)
        {}
      end
    end

    def resolve_file_path
      path = if @options_str.start_with?(".") && @base_dir.present?
        File.expand_path(@options_str, @base_dir)
      else
        Rails.root.join(@options_str)
      end
      Pathname.new path
    end

    def evaluate
      if Lookbook.config.preview_params_options_eval == true
        if @eval_scope.nil?
          raise "Preview params eval must be scoped to an object"
        else
          @eval_scope.instance_eval(statement)
        end
      else
        raise "The config option `preview_params_options_eval` must be set to `true` before param options can be evaluated at runtime"
      end
    end

    def self.extract_options(str)
      str ||= ""
      str.strip!
      opts_str = ""

      MATCHERS.each do |regexp|
        match_data = str.match(regexp)
        unless match_data.nil?
          str.gsub!(regexp, "").strip!
          opts_str = match_data[1]
          break
        end
      end

      [str, opts_str]
    end

    def self.resolveable?(str)
      return unless str.is_a?(String)
      str.strip!
      MATCHERS.each do |regexp|
        return true if str.match?(regexp)
      end
      false
    end

    private

    def statement
      evaluatable? ? eval_match_data[2].strip : "{}"
    end

    def evaluatable?
      eval_match_data.present?
    end

    def eval_match_data
      @eval_match_data ||= @options_str.match(EVAL_OPTION_MATCH) || @options_str.match(SYMBOL_MATCH)
    end
  end
end
