import { Editor, Transforms, Element as SlateElement } from "slate";
import { ReactEditor } from "slate-react";
import { ElementType } from "../types/element";

const alignment = [
  ElementType.ALIGN_LEFT,
  ElementType.ALIGN_CENTER,
  ElementType.ALIGN_RIGHT,
];
const list_types = [ElementType.OL, ElementType.UL];

export const toggleBlock = (editor: Editor, format: ElementType) => {
  const isActive = isBlockActive(editor, format);
  const isList = list_types.includes(format);
  const isIndent = alignment.includes(format);
  const isAligned = alignment.some((alignmentType) =>
    isBlockActive(editor, alignmentType),
  );

  /*If the node is already aligned and change in indent is called we should unwrap it first and split the node to prevent
    messy, nested DOM structure and bugs due to that.*/
  if (isAligned && isIndent) {
    Transforms.unwrapNodes(editor, {
      match: (n) =>
        alignment.includes(
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type,
        ),
      split: true,
    });
  }

  /* Wraping the nodes for alignment, to allow it to co-exist with other block level operations*/
  if (isIndent) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: [],
    });
    return;
  }
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      list_types.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type,
      ),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive
      ? ElementType.PARAGRAPH
      : isList
      ? ElementType.LIST_ITEM
      : format,
  });
  if (isList && !isActive) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: [],
    });
  }
};

export const addMarkData = (
  editor: Editor,
  data: { format: ElementType; value: any },
) => {
  Editor.addMark(editor, data.format, data.value);
};

export const toggleMark = (editor: Editor, format: ElementType) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
  ReactEditor.focus(editor as ReactEditor);
};

export const isMarkActive = (editor: Editor, format: ElementType) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

export const isBlockActive = (editor: Editor, format: ElementType) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

export const activeMark = (editor: Editor, format: ElementType) => {
  const defaultMarkData: Record<string, string | number> = {
    [ElementType.FONT_COLOR]: "black",
    [ElementType.FONT_BG_COLOR]: "black",
    [ElementType.FONT_SIZE]: "14",
    [ElementType.HEADER]: "0",
  };
  const marks = Editor.marks(editor);
  const defaultValue = defaultMarkData[format];
  return marks?.[format] ?? defaultValue;
};
