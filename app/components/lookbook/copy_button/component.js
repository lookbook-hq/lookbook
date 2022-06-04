import { initClipboard } from "~/app/assets/lookbook/js/components/clipboard";
import buttonComponent from "@components/button/component";

export default function copyButtonComponent() {
  const button = buttonComponent();
  return {
    ...button,

    copied: false,

    init() {
      button.init.bind(this)();
      initClipboard(this);
    },
  };
}
