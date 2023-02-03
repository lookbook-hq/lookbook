import { decodeEntities } from "@helpers/string";

export default function embedCodeDisplayComponent() {
  let copyTimeout = null;

  return {
    copied: false,
    embedType: "",

    copyEmbedCode() {
      if (this.embedType) {
        this.$nextTick(async () => {
          const targetEl = this.$root.querySelector(
            `[data-embed-type='${this.embedType}']`
          );
          const content = decodeEntities(targetEl.innerHTML.trim());

          await window.navigator.clipboard.writeText(content);
          this.copied = true;

          if (copyTimeout) {
            clearTimeout(copyTimeout);
          }

          copyTimeout = setTimeout(() => {
            this.copied = false;
          }, 2000);
        });
      }
    },
  };
}
