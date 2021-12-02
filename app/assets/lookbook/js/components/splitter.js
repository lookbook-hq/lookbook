import Split from "split-grid";

export default function splitter(direction, props = {}) {
  return {
    splits: [],
    init() {
      const type = `${direction === "vertical" ? "column" : "row"}Gutters`;
      const element = this.$el;
      Split({
        [type]: [{ track: 1, element }],
        minSize: props.minSize || 0,
        writeStyle() {},
        onDrag: (dir, track, style) => {
          this.splits = style.split(" ").map((num) => parseInt(num));
        },
        onDragStart: () => {
          this.$store.layout.reflowing = true;
        },
        onDragEnd: () => {
          this.$store.layout.reflowing = false;
        },
      });
    },
  };
}
