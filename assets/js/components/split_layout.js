import Split from "split-grid";

export default function splitLayout(id, opts = {}) {
  return {
    forceOrientation: false,
    orientation: this.$persist(opts.orientation || "horizontal").as(
      `${id}-split-orientation`
    ),

    verticalSizes: this.$persist(
      opts.verticalSizes || opts.sizes || ["50%", "50%"]
    ).as(`${id}-split-vertical-sizes`),
    horizontalSizes: this.$persist(
      opts.horizontalSizes || opts.sizes || ["50%", "50%"]
    ).as(`${id}-split-horizontal-sizes`),

    minHorizontalSizes: opts.minHorizontalSizes || opts.minSizes || [],
    minVerticalSizes: opts.minVerticalSizes || opts.minSizes || [],

    layoutWidth: null,
    layoutHeight: null,

    splitter: null,
    gutters: [],

    initSplit() {
      if (this.gutters.length) {
        this.$debug(`Split layout initialized (#${id})`);

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
        });
      }
    },

    registerGutter(el) {
      this.gutters.push(el);
    },

    setSplits(splits) {
      if (this.horizontal) {
        this.horizontalSizes = splits;
      } else {
        this.verticalSizes = splits;
      }
    },

    switchOrientation() {
      this.orientation = this.vertical ? "horizontal" : "vertical";
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
      return this.horizontal ? this.horizontalSizes : this.verticalSizes;
    },

    get vertical() {
      if (this.forceOrientation) {
        return this.forceOrientation === "vertical";
      }
      return this.orientation === "vertical";
    },

    get horizontal() {
      if (this.forceOrientation) {
        return this.forceOrientation === "horizontal";
      }
      return this.orientation === "horizontal";
    },

    root: {
      [":style"]() {
        return {
          "grid-template-columns": this.vertical && sizeStr(this.splits),
          "grid-template-rows": this.horizontal && sizeStr(this.splits),
        };
      },

      ["x-bind:data-orientation"]() {
        return this.forceOrientation || this.orientation;
      },

      ["x-effect"]() {
        this.initSplit();
      },
    },
  };
}

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
