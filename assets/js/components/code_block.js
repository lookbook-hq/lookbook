import "prism-code-editor/prism/languages";
import "prism-code-editor/prism/languages/markup";
import { createEditor } from "prism-code-editor";
import { indentGuides } from "prism-code-editor/guides";
import { matchBrackets } from "prism-code-editor/match-brackets";
import { matchTags } from "prism-code-editor/match-tags";
import { defaultCommands } from "prism-code-editor/commands";
// import {
//   blockCommentFolding,
//   bracketFolding,
//   markdownFolding,
//   readOnlyCodeFolding,
//   tagFolding,
// } from "prism-code-editor/code-folding";
import { highlightBracketPairs } from "prism-code-editor/highlight-brackets";
import { highlightSelectionMatches } from "prism-code-editor/search";

export default function codeEditor({ readOnly = true }) {
  return {
    editor: null,

    async init() {
      this.$debug("Initializing code editor");

      this.editor = await createEditor(
        this.$refs.container,
        {
          language: "html",
          theme: "github-light",
          value: this.$refs.raw.value,
          lineNumbers: true,
          readOnly: true,
          insertSpaces: true,
          wordWrap: true,
        },
        matchTags(),
        matchBrackets(),
        highlightBracketPairs(),
        highlightSelectionMatches(),
        indentGuides(),
        defaultCommands()
        // readOnlyCodeFolding(
        //   tagFolding,
        //   bracketFolding,
        //   markdownFolding,
        //   blockCommentFolding
        // )
      );
    },
  };
}
