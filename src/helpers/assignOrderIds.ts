import { Node } from "../types/node";

export const assignOrderIds = (nodes: Node[] = [], startOrderId: number = 0): Node[] => {
  let orderId = startOrderId;

  const assignOrder = (nodes: Node[] = []): void => {
    nodes.forEach((node) => {
      node.order_id = orderId++;
      if (node.isOpen && node.children?.length) {
        assignOrder(node.children);
      }
    });
  };

  assignOrder(nodes);
  return nodes;
};
