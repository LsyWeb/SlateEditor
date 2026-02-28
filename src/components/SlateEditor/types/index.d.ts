import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

type CustomElement = {
  type: string;
  children: CustomText[];
  isInline?: boolean;
};

type LinkElement = CustomElement & {
  href: string;
  linkText: string;
};

type ImageElement = CustomElement & {
  alt?: string;
  url?: string;
  width?: number | string;
  height?: number | string;
  align?: "left" | "center" | "right";
};

type CustomText = {
  text?: string;
  bold?: true;
  type?: string;
  children?: CustomText[];
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement | LinkElement | ImageElement;
    Text: CustomText;
  }
}
