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
type CustomText = {
  text?: string;
  bold?: true;
  type?: string;
  children?: CustomText[];
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement | LinkElement;
    Text: CustomText;
  }
}
