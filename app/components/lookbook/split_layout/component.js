import Split from "split-grid";

export default function splitLayoutComponent({ split, opts }) {
  let splitter = null;

  return {
    get vertical() {
      return split.direction === "vertical";
    },

    get horizontal() {
      return !this.vertical;
    },

    get splits() {
      if (this.horizontal && split.horizontalSizes) {
        return split.horizontalSizes;
      } else if (this.vertical && split.verticalSizes) {
        return split.verticalSizes;
      } else {
        return split.sizes || [];
      }
    },

    get minSizes() {
      if (this.horizontal && opts.minHorizontalSizes) {
        return opts.minHorizontalSizes;
      } else if (this.vertical && opts.minVerticalSizes) {
        return opts.minVerticalSizes;
      } else {
        return opts.minSizes || [];
      }
    },

    switchOrientation() {
      split.direction = this.vertical ? "horizontal" : "vertical";
    },

    registerGutter() {
      this._gutters.push(this.$el);
    },

    initSplit() {
      if (this._gutters.length) {
        this._destroySplit();
        const dir = this.horizontal ? "row" : "column";
        splitter = Split({
          [`${dir}Gutters`]: gutterSplits(this._gutters),
          [`${dir}MinSizes`]: sizeSplits(this.minSizes),
          snapOffset: 0,
          dragInterval: 1,
          writeStyle() {},
          onDrag: (dir, gutterTrack, style) => {
            const splits = style
              .split(" ")
              .map((value, i) => (i % 2 == 0 ? value : null))
              .filter((v) => v);
            this._setSplits(splits);
          },
        });
      }
    },

    bindings: {
      root: {
        [":style"]() {
          return {
            "grid-template-columns": this.vertical && sizeStr(this.splits),
            "grid-template-rows": this.horizontal && sizeStr(this.splits),
          };
        },
      },
    },

    // protected

    _gutters: [],

    _destroySplit() {
      if (splitter) splitter.destroy();
    },

    _setSplits(splits) {
      if (this.horizontal && split.horizontalSizes) {
        split.horizontalSizes = splits;
      } else if (this.vertical && split.verticalSizes) {
        split.verticalSizes = splits;
      } else {
        split.sizes = splits;
      }
    },
  };
}

// utils

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
