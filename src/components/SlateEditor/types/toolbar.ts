import { ElementType } from "./element";

export type ToolbarItem = {
  id: number;
  format: ElementType;
  type?: ToolbarType;
  options?: ToolbarOptions
  tooltip?: string;
}

export type ToolbarOptions = { label: string; value: string | number }[];

export type ToolbarType = "block"  | 'mark' | "link" | "embed" | "table" | "inTable" | 'dropdown' | 'color-picker';

export type ToolbarGroup = ToolbarItem[][];