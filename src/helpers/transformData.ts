import { Node } from "../types/node";

export function buildTree(flatData: Node[]): Node[] {
  const map = new Map<string, Node>();
  flatData.forEach((item) => {
    map.set(item.id, { ...item, children: [], isOpen: false });
  });

  const roots: Node[] = [];

  flatData.forEach((item) => {
    const node = map.get(item.id)!;
    if (item.parent_id === null) {
      roots.push(node);
    } else {
      const parent = map.get(item.parent_id);
      if (parent) {
        parent.children!.push(node);
      }
    }
  });

  return roots;
}
