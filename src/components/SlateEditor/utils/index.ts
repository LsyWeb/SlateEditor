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
 * 根据节点信息获取slate的Path
 * @param element
 */
export const getElementPath = (editor: Editor, element: Element) => {
  return ReactEditor.findPath(editor, element); // 查找 Slate 节点的 路径(path)。
};

/**
 * 设置选中节点的属性（可以只写需要改变的属性）
 * @param editor Editor
 * @param property
 */
export const setSelectedNodeProperty = (
  editor: Editor,
  property: Record<string, any>,
) => {
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
 * 设置某个节点的属性（可以只写需要改变的属性）
 * @param editor Editor
 * @param property
 */
export const setNodeProperty = (
  editor: Editor,
  element: Element,
  property: Record<string, any>,
) => {
  const parentPath = getElementPath(editor, element); // 查找 Slate 节点的 路径(path)。

  // 设置节点属性href
  Transforms.setNodes(editor, property as any, {
    at: parentPath,
  });
};
