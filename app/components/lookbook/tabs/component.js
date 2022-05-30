import debounce from "debounce";
import tippy from "~/app/assets/lookbook/js/lib/tippy";
import { observeSize } from "@helpers/layout";
import { getElementSize } from "@helpers/dom";

export default function tabsComponent(store) {
  const initial = store.activeTab || null;
  return {
    visibleTabsCount: 0,

    triggerLeft: 0,

    get tabs() {
      return Array.from(this.$refs.tabs.children);
    },

    get dropdownTabs() {
      return Array.from(this.$refs.dropdown.children);
    },

    get tabWidths() {
      return this.tabs.map(
        (tab) => getElementSize(tab, { includeMargins: true }).width
      );
    },

    init() {
      this.$nextTick(() => {
        this.dropdown = tippy(this.$refs.dropdownTrigger, {
          content: this.$refs.dropdown,
          theme: "menu",
          interactive: true,
          trigger: "click",
          appendTo: this.$root,
        });

        const initialTab = initial
          ? this.tabs.find((t) => this._getRef(t) === initial)
          : this.tabs[0];
        this.selectTab(initialTab);

        this.parentObserver = observeSize(
          this.$root.parentElement,
          debounce(this.handleResize.bind(this), 10)
        );

        this.$watch("visibleTabsCount", (value) => {
          this.debug(`'#${this.$root.id}' visible tabs count:`, value);
        });
      });
    },

    handleResize({ width }) {
      if (width === this._lastMeasuredWidth) {
        return;
      }

      if (width === this.$root.offsetWidth) {
        this.visibleTabsCount = this.tabs.length;
        return;
      }

      let sumTabWidths = 60;
      let triggerLeft = 20;
      let visibleTabsCount = 0;
      this.tabWidths.forEach((tabWidth) => {
        sumTabWidths += tabWidth;
        if (sumTabWidths < width) {
          triggerLeft += tabWidth;
          visibleTabsCount++;
        }
      });

      this.visibleTabsCount = visibleTabsCount;
      this.triggerLeft = triggerLeft;
      this._lastMeasuredWidth = width;
    },

    selectTab(el) {
      store.activeTab = this._getRef(el);
      this.dropdown.hide();
    },

    isSelected(el) {
      return store.activeTab === this._getRef(el);
    },

    isDisabled(el) {
      return el.getAttribute("data-disabled") == "true";
    },

    hasHiddenTabs() {
      return this.visibleTabsCount < this.tabs.length;
    },

    // protected

    _lastMeasuredWidth: 0,

    _getRef(el) {
      return el ? el.getAttribute("x-ref").replace("dropdown-", "") : null;
    },
  };
}
