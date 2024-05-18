import importGlob from "postcss-import-ext-glob";
import postInline from "postcss-import";
import nesting from "postcss-nesting";
import presetEnv from "postcss-preset-env";

export default {
  plugins: [importGlob, postInline, nesting, presetEnv],
};
