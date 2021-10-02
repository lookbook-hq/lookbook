export default function clipboard() {
  return {
    content: null,
    done: false,
    save() {
      this.$clipboard(this.content);
      this.done = true;
      setTimeout(() => {
        this.done = false;
      }, 1000);
    },
  };
}
