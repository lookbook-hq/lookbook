if Lookbook&.env&.development?
  PutsDebuggerer.header = "-" * 80
  PutsDebuggerer.print_engine = lambda do |object|
    output = case object
    when String
      object
    else
      PrettyPlease.prettify(object)
    end
    puts output
  end
end
