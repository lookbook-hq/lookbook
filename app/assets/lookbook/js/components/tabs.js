import tippy from "tippy.js";

export default function tabs() {
  return {
    width: 0,
    tabsWidth: 0,
    init() {
      const ro = new ResizeObserver((entries) => {
        this.width = Math.round(entries[0].contentRect.width);
      });
      ro.observe(this.$refs.tabs);
      this.dropdown = tippy(this.$refs.toggle, {
        allowHTML: true,
        interactive: true,
        trigger: "click",
        placement: "bottom-end",
        theme: "menu",
        content: this.$refs.dropdown,
      });
    },
    get tabs() {
      return Array.from(this.$refs.tabs.querySelectorAll(":scope > a"));
    },
    get visibleTabCount() {
      let cumulativeWidth = 0;
      for (let i = 0; i < this.tabs.length; i++) {
        const el = this.tabs[i];
        const margin = parseInt(
          window
            .getComputedStyle(el)
            .getPropertyValue("margin-left")
            .replace("px", ""),
          10
        );
        cumulativeWidth += el.clientWidth + margin;
        if (cumulativeWidth > this.width) {
          this.tabsWidth = cumulativeWidth - el.clientWidth;
          return i;
        }
      }
      return this.tabs.length;
    },
    get hiddenTabs() {
      return this.tabs.slice(this.visibleTabCount, -1);
    },
    hideDropdown() {
      this.dropdown.hide();
    },
  };
}
