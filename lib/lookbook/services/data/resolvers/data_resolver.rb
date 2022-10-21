module Lookbook
  class DataResolver < Service
    MATCHER = /(?!.*)/
    MATCH_INDEX = 1

    attr_reader :eval_context, :base_dir, :file, :fallback

    def initialize(input, eval_context: nil, permit_eval: false, fail_silently: false, base_dir: Rails.root, file: nil, fallback: nil)
      @input = input.to_s
      @eval_context = eval_context
      @permit_eval = permit_eval
      @fail_silently = fail_silently
      @fallback = fallback
      @base_dir = base_dir
      @file = file
    end

    def call
      resolve extract(@input)
    rescue => exception
      Lookbook.logger.debug "Data resolution failed. (Input: '#{@input}')"
      @fail_silently ? fallback : raise(exception)
    end

    def self.resolveable?(input)
      input.to_s.match?(self::MATCHER)
    end

    protected

    def extract(input)
      match_data = input.match(self.class::MATCHER)
      if match_data.nil?
        raise_error "Invalid data '#{input}'"
      else
        match_data[self.class::MATCH_INDEX]
      end
    end

    def resolve(input)
      raise ParserError.new "OptionsResolver must be subclassed with a :resolve method defined"
    end

    def evaluate(input, fallback = @fallback)
      if evaluatable?
        begin
          eval_context.instance_eval(input.to_s)
        rescue => exception
          raise_error "Could not evaluate statetment (#{exception.message})", exception
        end
      else
        Lookbook.logger.debug "Data cannot be evaluated (Input: '#{input}')"
        fallback
      end
    end

    def raise_error(message, original_exception = nil)
      raise ParserError.new message, original: original_exception, scope: "resolvers"
    end

    private

    def evaluatable?
      if !@permit_eval
        raise_error "Runtime evaluation is not permitted"
      end
      eval_context.present?
    end
  end
end
