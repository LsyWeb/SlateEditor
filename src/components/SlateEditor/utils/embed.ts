import { Editor, Transforms } from "slate";
import { createParagraph } from "./paragraph";
import { ElementType } from "../types/element";

export type EmbedData = {
  url: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
};

export const createImageNode = (
  alt: string,
  { url, width, height }: EmbedData,
) => ({
  type: "image",
  alt,
  url,
  width,
  height,
  children: [{ text: "" }],
});

export const createVideoNode = ({ url, width, height }: EmbedData) => ({
  type: "video",
  url,
  width,
  height,
  children: [{ text: "" }],
});

export const insertEmbed = (
  editor: Editor,
  embedData: EmbedData,
  format: ElementType,
) => {
  const { url, width, height, alt } = embedData;
  if (!url) return;

  const imgWidth = width ? `${width}px` : "100%";
  const imgHeight = height ? `${height}px` : "auto";

  const embed =
    format === "image"
      ? createImageNode(alt || "EditorImage", {
          url,
          width: imgWidth,
          height: imgHeight,
        })
      : createVideoNode({ url, width: imgWidth, height: imgHeight });

  Transforms.insertNodes(editor, embed, { select: true });
  Transforms.insertNodes(editor, createParagraph(""), { mode: "highest" });
};
