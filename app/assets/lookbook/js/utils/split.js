import Split from "split-grid";

export default function (props) {
  const page = Alpine.store("page");
  return {
    init() {
      Split({
        [`${props.direction === "vertical" ? "row" : "column"}Gutters`]: [
          { track: 1, element: this.$el },
        ],
        minSize: props.minSize,
        writeStyle() {},
        onDrag(dir, track, style) {
          const splits = style.split(" ").map((num) => parseInt(num));
          props.onDrag(splits);
        },
        onDragStart() {
          page.reflowing = true;
        },
        onDragEnd() {
          page.reflowing = false;
        },
      });
    },
  };
}
