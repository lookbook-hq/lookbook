import { decodeEntities } from "@helpers/string";

export default function embedCodeDropdownComponent() {
  let copyTimeout = null;

  return {
    copied: false,

    copyEmbedCode() {
      this.$nextTick(async () => {
        const content = decodeEntities(this.$refs.copyTarget.innerHTML.trim());

        await window.navigator.clipboard.writeText(content);
        this.copied = true;

        if (copyTimeout) {
          clearTimeout(copyTimeout);
        }

        copyTimeout = setTimeout(() => {
          this.copied = false;
        }, 2000);
      });
    },
  };
}
