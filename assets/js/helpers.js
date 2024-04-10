function observeSize(element, callback = () => {}) {
  const observer = new ResizeObserver((entries) => {
    const rect = entries[0].target.getBoundingClientRect();
    callback({
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    });
  });
  observer.observe(element);
  return observer;
}
export { observeSize };
