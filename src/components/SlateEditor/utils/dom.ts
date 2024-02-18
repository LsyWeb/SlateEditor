import { Editor, Element, Range } from "slate";
import { ReactEditor } from "slate-react";

/**
 * 获取选中文本的dom
 * @param editor
 * @returns
 */
export const getSelectedTextDom = (
  editor: Editor,
): Promise<void | HTMLElement> => {
  return new Promise((resolve, reject) => {
    const { selection } = editor;
    if (!selection) return;

    const [start] = Range.edges(selection);
    const startPath = start.path;

    const [node] = Editor.node(editor, startPath);
    if (node) {
      setTimeout(() => {
        const domNode = ReactEditor.toDOMNode(editor, node);
        resolve(domNode);
      }, 16);
    } else {
      resolve();
    }
  });
};

/**
 * 获取节点的dom
 * @param editor
 * @param element
 * @returns
 */
export const getElementDom = (
  editor: Editor,
  element: Element,
): HTMLElement => {
  return ReactEditor.toDOMNode(editor, element); // 从 Slate 节点中查找原生DOM元素。
};
