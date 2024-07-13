export interface Node {
  title: string;
  parent_id: string | null;
  id: string;
  isOpen: boolean;
  children?: Node[];
  order_id: number;
}