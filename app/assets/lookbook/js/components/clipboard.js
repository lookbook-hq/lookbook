export default function clipboard() {
  return {
    content: null,
    done: false,
    async save() {
      await window.navigator.clipboard.writeText(this.content);
      this.done = true;
      setTimeout(() => {
        this.done = false;
      }, 1000);
    },
  };
}
