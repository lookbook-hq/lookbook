function decodeEntities(content) {
  var txt = document.createElement("textarea");
  txt.innerHTML = content;
  return txt.value;
}

function prefixString(string, prefix = null) {
  return prefix ? `${prefix}-${string}` : string;
}

export { prefixString, decodeEntities };
