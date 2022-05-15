import { observeSize } from "@helpers/layout";

export default function paramFieldsetComponent() {
  return {
    narrow: false,
    init() {
      observeSize(this.$el, ({ width }) => {
        this.narrow = width < 450;
      });
    },
  };
}
