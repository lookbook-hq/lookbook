import { linter as erbLinter } from "@lib/herb.js";
import { registerLinter } from "@lib/linters.js";

registerLinter(erbLinter);

export const Lookbook = {
  registerLinter,
};

export default Lookbook;
