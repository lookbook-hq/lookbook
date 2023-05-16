export default function navItemComponent({ id, matchers }) {
  matchers = matchers.map((matcher) =>
    matcher.replace(/\s/g, "").toLowerCase()
  );

  return {
    filteredOut: false,

    get open() {
      return this.isCollection && this.isOpen(id);
    },

    get active() {
      if (this.$refs.link) {
        return (
          this.location &&
          this.location.pathname === this.$refs.link.getAttribute("href")
        );
      }
      return false;
    },

    get children() {
      return this.$refs.items ? Array.from(this.$refs.items.children) : [];
    },

    get isCollection() {
      return !this.$refs.link;
    },

    toggle() {
      this.toggleOpen(id);
    },

    async filter(text) {
      if (this.isCollection) {
        this.filteredOut = true;
        this.children.forEach(async (child) => {
          const data = Alpine.$data(child);
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
        const matched = (matchers || []).map((m) => m.includes(text));
        return matched.filter((m) => m).length;
      }
      return true;
    },

    bindings: {
      toggle: {
        ["x-on:click.stop"]: "toggle",
        ["x-ref"]: "toggle",
      },
      link: {
        [":class"]: "{'!bg-lookbook-nav-item-active':active}",
        ["x-ref"]: "link",
      },
    },
  };
}
