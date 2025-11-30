export default function getText(root: Node | Iterable<Node>, depth = 0): string {
  if (!root || !globalThis.Node) {
    return "";
  }

  if (typeof (root as any)[Symbol.iterator] === "function") {
    let nodes = Array.isArray(root) ? root : [...(root as Iterable<Node>)];
    return nodes.map((node) => getText(node, --depth)).join("");
  }

  let node = root as Node;

  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? "";
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    let element = node as HTMLElement;

    if (element.hasAttribute("slot") || element.matches("style, script")) {
      return "";
    }

    if (element instanceof HTMLSlotElement) {
      let assignedNodes = element.assignedNodes({ flatten: true });

      if (assignedNodes.length > 0) {
        // If no assigned nodes, we still want the slot contents
        return getText(assignedNodes, --depth);
      }
    }

    return depth > -1 ? getText(element, --depth) : (element.textContent ?? "");
  }

  return node.hasChildNodes() ? getText(node.childNodes, --depth) : "";
}
