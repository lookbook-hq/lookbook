import { Herb } from "@herb-tools/browser";
import { Linter } from "@herb-tools/linter";

export async function lint(content: string) {
  await Herb.load();
  const linter = new Linter(Herb);
  return linter.lint(content);
}

export const linter = () => ({
  lint,
  lang: ["erb", "html"],
});
