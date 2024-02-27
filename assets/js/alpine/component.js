export default function AlpineComponent(name, fn) {
  fn.componentName = name;
  return fn;
}
