import AlpineComponent from "@js/alpine/component";
import { CodeJar } from "codejar";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/components/prism-haml";
import "prismjs/components/prism-liquid";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-css";
import "prismjs/components/prism-css-extras";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-erb";

export default AlpineComponent("code", () => {
  return {
    init() {
      const editor = CodeJar(this.$refs.editor, (el) =>
        Prism.highlightElement(el)
      );
      this.$refs.editor.setAttribute("contenteditable", "false");
      editor.updateCode(this.$refs.source.innerText);
    },
  };
});
