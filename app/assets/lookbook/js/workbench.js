export default function workbench() {
  const inspector = Alpine.store("inspector");
  return {
    previewViewportHeight: 0,
    previewViewportWidth: 0,
    splitProps: {
      direction: "vertical",
      minSize: 200,
      onDrag(splits) {
        inspector.height = splits[2];
      },
    },
  };
}
