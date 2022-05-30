function prefixString(string, prefix = null) {
  return prefix ? `${prefix}-${string}` : string;
}

export { prefixString };
