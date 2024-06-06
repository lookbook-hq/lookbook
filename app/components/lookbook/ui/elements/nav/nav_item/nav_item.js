import AlpineComponent from "@js/alpine/component";
import { getData } from "@js/alpine/utils";

export default AlpineComponent("navItem", ({ keywords, collection }) => {
  return {
    keywords: [],
    isCollection: false,
    filteredOut: false,
    selected: false,

    init() {
      this.keywords = keywords || [];
      this.isCollection = collection || false;
      this.setSelectionState();
    },

    visit() {
      if (!this.selected && this.targetUrl) {
        this.$dispatch("lookbook:visit", { url: this.targetUrl });
      }
    },

    async filter(text) {
      if (this.isCollection) {
        this.filteredOut = true;
        this.children.forEach(async (data) => {
          await data.filter(text);
          if (!data.filteredOut) {
            this.filteredOut = false;
          }
        });
      } else {
        this.filteredOut = !this.match(text);
      }
      return this;
    },

    match(text) {
      if (text.length) {
        const matched = this.keywords.map((k) => k.includes(text));
        return matched.filter((m) => m).length;
      }
      return true;
    },

    setSelectionState() {
      const selected = this.targetUrl === document.location.pathname;
      this.selected = selected;
    },

    get targetUrl() {
      return this.$root.getAttribute("data-url");
    },

    get key() {
      return this.$root.getAttribute("key");
    },

    get expanded() {
      return (
        this.expandedItems && this.key && this.expandedItems.includes(this.key)
      );
    },

    set expanded(isExpanded) {
      if (isExpanded) {
        if (this.expandedItems.indexOf(this.key) === -1) {
          this.expandedItems.push(this.key);
        }
      } else {
        const index = this.expandedItems.indexOf(this.key);
        if (index >= 0) this.expandedItems.splice(index, 1);
      }
    },

    get children() {
      return this.$refs.children
        ? Array.from(this.$refs.children.children).map((node) => getData(node))
        : [];
    },

    get parent() {
      const parentElement = this.$root.parentElement.closest(
        "[data-component='nav-item']"
      );
      return parentElement ? getData(parentElement) : null;
    },

    bindings: {
      root: {
        ["x-show"]() {
          return !this.filteredOut;
        },
        ["@page-update:complete.document"]() {
          this.setSelectionState();
        },
        ["@page-load:complete.document"]() {
          this.setSelectionState();
        },
        [":aria-expanded"]() {
          return this.expanded;
        },
        [":aria-selected"]() {
          return this.selected;
        },
      },
    },
  };
});
