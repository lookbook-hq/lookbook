function decodeEntities(content) {
  var txt = document.createElement("textarea");
  txt.innerHTML = content;
  return txt.value;
}

function prefixString(string, prefix = null) {
  return prefix ? `${prefix}-${string}` : string;
}

function parseSearchParamValue(value) {
  const params = {};
  value.split("|").forEach((pair_str) => {
    const [key, value] = pair_str.split(":").map((part) => part.trim());
    params[key] = value;
  });
  return params;
}

function buildSearchParamValue(data) {
  const pairs = [];
  for (const [key, value] of Object.entries(data)) {
    pairs.push(`${key}:${value}`);
  }
  return pairs.join("|");
}

export {
  prefixString,
  decodeEntities,
  parseSearchParamValue,
  buildSearchParamValue,
};
