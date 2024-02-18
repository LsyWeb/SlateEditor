import { Editor, Transforms } from "slate";

import { createParagraph } from "./paragraph";
export const createImageNode = (alt: any, { url, width, height }: any) => ({
  type: "image",
  alt,
  url,
  width,
  height,
  children: [{ text: "" }],
});
export const createVideoNode = ({ url, width, height }: any) => ({
  type: "video",
  url,
  width,
  height,
  children: [{ text: "" }],
});

export const insertEmbed = (editor: Editor, embedData: any, format: any) => {
  const { url, width, height } = embedData;
  if (!url) return;
  embedData.width = width ? `${width}px` : "100%";
  embedData.height = height ? `${height}px` : "auto";
  const embed =
    format === "image"
      ? createImageNode("EditorImage", embedData)
      : createVideoNode(embedData);

  console.log(format);
  Transforms.insertNodes(editor, embed, { select: true });
  Transforms.insertNodes(editor, createParagraph(""), { mode: "highest" });
};
