module ComponentSpecHelper
  def lookbook_example(lookup_path = "button/playground")
    Lookbook.previews.find_example(lookup_path)
  end
end
