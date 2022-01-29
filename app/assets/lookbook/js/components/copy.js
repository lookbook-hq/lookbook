export default function copy() {
  return {
    get content() {
      const target = document.getElementById(
        this.$root.getAttribute("data-target")
      );
      const decoder = document.createElement("textarea");
      decoder.innerHTML = target ? target.innerHTML : "";
      return decoder.value.trim();
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
