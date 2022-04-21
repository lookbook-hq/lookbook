function getComponents(importObject) {
  const files = Object.assign(
    {},
    ...(function _flatten(o, key = "root") {
      return [].concat(
        ...Object.keys(o).map((k) =>
          typeof o[k] === "object"
            ? _flatten(o[k], `${key}-${k}`)
            : { [`${key}-${k}`]: o[k] }
        )
      );
    })(importObject)
  );
  return Object.keys(files).map((key) => files[key]);
}

export { getComponents };
