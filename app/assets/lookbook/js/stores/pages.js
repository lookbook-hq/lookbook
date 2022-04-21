export default function initPagesStore(Alpine) {
  return {
    embeds: Alpine.$persist({}).as("pages-embeds"),
  };
}
