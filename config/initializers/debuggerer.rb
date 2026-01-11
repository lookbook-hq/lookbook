if Rails.env.development? || Rails.env.test?
  PutsDebuggerer.app_path = Rails.root.to_s
  PutsDebuggerer.header = "-" * 80
  PutsDebuggerer.printer = :puts
  PutsDebuggerer.print_engine = lambda do |object|
    puts case object
    when String
      object
    else
      PrettyPlease.prettify(object)
    end
  end
else
  def pd(...)
    # noop
  end
end
