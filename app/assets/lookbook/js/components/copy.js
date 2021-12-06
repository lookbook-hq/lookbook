export default function copy(id) {
  return {
    get content() {
      const target = document.getElementById(id);
      return (target ? target.innerHTML : "").trim();
    },
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
