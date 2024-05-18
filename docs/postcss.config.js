import importGlob from "postcss-import-ext-glob";
import postInline from "postcss-import";
import nesting from "postcss-nesting";
import presetEnv from "postcss-preset-env";
import utopia from "postcss-utopia";

export default {
  plugins: [
    importGlob,
    postInline,
    nesting,
    presetEnv,
    utopia({
      minWidth: 320,
      maxWidth: 1280,
    }),
  ],
};
