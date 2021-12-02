import Split from "split-grid";

export default function (element, props) {
  Split({
    [`${props.direction === "vertical" ? "row" : "column"}Gutters`]: [
      { track: 1, element },
    ],
    minSize: props.minSize,
    writeStyle() {},
    onDrag(dir, track, style) {
      const splits = style.split(" ").map((num) => parseInt(num));
      props.onDrag(splits);
    },
    // onDragStart() {
    //   this.reflowing = true;
    // },
    // onDragEnd() {
    //   this.reflowing = false;
    // },
  });
}
