export default function navSection() {
  return {
    open: true,
    toggle() {
      this.open = !this.open;
    },
  };
}
