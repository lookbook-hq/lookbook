import AlpineComponent from "@js/alpine/component";
import Split from "split-grid";
import { observeSize } from "@js/helpers";

export default AlpineComponent("paneGroup", (id, opts = {}) => {
  const store = Alpine.store("app").fetch("pane-group", id, {
    split: {
      orientation: opts.orientation || "horizontal",
      verticalSizes: opts.verticalSizes || opts.sizes || ["50%", "50%"],
      horizontalSizes: opts.horizontalSizes || opts.sizes || ["50%", "50%"],
    },
  });

  return {
    splitter: null,
    layoutWidth: null,
    layoutHeight: null,
    minHorizontalSizes: opts.minHorizontalSizes || opts.minSizes || [],
    minVerticalSizes: opts.minVerticalSizes || opts.minSizes || [],
    forceOrientation: false,
    gutters: [],

    init() {
      observeSize(this.$el, ({ width, height }) => {
        this.layoutWidth = Math.round(width);
        this.layoutHeight = Math.round(height);
      });
    },

    initSplit() {
      if (this.gutters.length) {
        this.destroySplitter();
        const dir = this.horizontal ? "row" : "column";
        this.splitter = Split({
          [`${dir}Gutters`]: gutterSplits(this.gutters),
          [`${dir}MinSizes`]: sizeSplits(this.minSizes),
          snapOffset: 0,
          dragInterval: 1,
          writeStyle() {},
          onDrag: (dir, gutterTrack, style) => {
            const splits = style
              .split(" ")
              .map((value, i) => (i % 2 == 0 ? value : null))
              .filter((v) => v);
            this.setSplits(splits);
          },
          onDragStart: () => {
            this.$dispatch("layout:resize-start", { layout: this });
          },
          onDragEnd: () => {
            this.$dispatch("layout:resize-start", { layout: this });
          },
        });
      }
    },

    registerGutter() {
      this.gutters.push(this.$el);
    },

    setSplits(splits) {
      if (this.horizontal) {
        store.split.horizontalSizes = splits;
      } else {
        store.split.verticalSizes = splits;
      }
    },

    switchOrientation() {
      store.split.orientation = this.vertical ? "horizontal" : "vertical";
    },

    destroySplitter() {
      if (this.splitter) this.splitter.destroy();
    },

    get minSizes() {
      if (this.horizontal) {
        return this.minHorizontalSizes;
      } else {
        return this.minVerticalSizes;
      }
    },

    get splits() {
      return this.horizontal
        ? store.split.horizontalSizes
        : store.split.verticalSizes;
    },

    get vertical() {
      if (this.forceOrientation) {
        return this.forceOrientation === "vertical";
      }
      return store.split.orientation === "vertical";
    },

    get horizontal() {
      if (this.forceOrientation) {
        return this.forceOrientation === "horizontal";
      }
      return store.split.orientation === "horizontal";
    },

    bindings: {
      root: {
        [":style"]() {
          return {
            "grid-template-columns": this.vertical && sizeStr(this.splits),
            "grid-template-rows": this.horizontal && sizeStr(this.splits),
          };
        },
        [":data-orientation"]() {
          return this.forceOrientation || store.split.orientation;
        },
      },
    },
  };
});

function sizeStr(sizes) {
  const values = [];
  sizes.forEach((size) => values.push(size, "1px"));
  return values.slice(0, -1).join(" ");
}

function gutterSplits(gutters) {
  return gutters.map((element, i) => {
    return {
      track: i * 2 + 1,
      element,
    };
  });
}

function sizeSplits(sizes) {
  const splits = {};
  sizes.forEach((value, i) => {
    if (value !== null) splits[i * 2] = value;
  });
  return splits;
}
