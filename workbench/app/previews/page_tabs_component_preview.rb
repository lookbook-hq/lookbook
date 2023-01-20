# @display centered true
class PageTabsComponentPreview < ViewComponent::Preview
  def basic
    render Lookbook::PageTabs::Component.new do |tabs|
      tabs.with_tab label: "First tab" do
        "<p>First tab content</p>".html_safe
      end
      tabs.with_tab label: "Second tab" do
        "<p>Second tab content</p>".html_safe
      end
    end
  end
end
