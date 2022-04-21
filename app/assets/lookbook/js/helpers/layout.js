function addMediaQueryListener(condition, callback) {
  const mediaQueryList = window.matchMedia(condition);
  const handleChange = (mql) => callback(mql.matches);
  handleChange(mediaQueryList);
  mediaQueryList.addEventListener("change", (mql) => handleChange(mql));
  return mediaQueryList;
}

export { addMediaQueryListener };
