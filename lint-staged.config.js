/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */

export default {
  "!(docs/**/*|dist/**/*)": ["prettier --write --ignore-unknown"],
  "**/*.rb": "standardrb --fix",
};
