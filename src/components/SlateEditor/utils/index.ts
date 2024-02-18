import { Editor, Element, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";

/**
 * 替换文本
 * @param editor Editor
 * @param text
 */
export const replaceText = (editor: Editor, text: string) => {
  const { selection } = editor;

  const [parent, parentPath] = Editor.parent(
    editor,
    selection?.focus?.path as any,
  );

  // 替换文本, https://rain120.github.io/athena/zh/slate/concepts/04-transforms.html#at-%E9%80%89%E9%A1%B9-the-at-option
  Transforms.insertText(editor, text, {
    at: parentPath,
  });
};

/**
 * 设置节点属性
 * @param editor Editor
 * @param property
 */
export const setNodeProperty = (editor: Editor, property: Node) => {
  const { selection } = editor;

  const [parent, parentPath] = Editor.parent(
    editor,
    selection?.focus?.path as any,
  );

  // 设置节点属性href
  Transforms.setNodes(editor, property, {
    at: parentPath,
  });
};

/**
 * 根据节点信息获取slate的Path
 * @param element
 */
export const getElementPath = async (editor: Editor, element: Element) => {
  return ReactEditor.findPath(editor, element); // 查找 Slate 节点的 路径(path)。
};
