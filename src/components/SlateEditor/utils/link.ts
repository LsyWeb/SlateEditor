import { Editor, Transforms, Path, Range, Element } from "slate";
import { LinkElement } from "../types";
import { ElementType } from "../types/element";

export const createLinkNode = (href: string, text: string): LinkElement => ({
  type: ElementType.LINK,
  href,
  linkText: text,
  isInline: true,
  children: [{ text }],
});

export const insertLink = (editor: Editor, { text }: { text: string }) => {
  if (!text) return;

  const { selection } = editor;
  const link = createLinkNode("", text);
  if (!!selection) {
    const [parent, parentPath] = Editor.parent(editor, selection.focus.path);
    if ((parent as any).type === ElementType.LINK) {
      removeLink(editor);
    }

    //for image nodes, will be implemented later
    if (editor.isVoid(parent as any)) {
      Transforms.insertNodes(
        editor,
        { type: ElementType.PARAGRAPH, children: [link] },
        {
          at: Path.next(parentPath),
          select: true,
        },
      );
    } else if (Range.isCollapsed(selection)) {
      Transforms.insertNodes(editor, link, { select: true });
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
    }
  } else {
    Transforms.insertNodes(editor, {
      type: ElementType.PARAGRAPH,
      children: [link],
    });
  }
};

export const removeLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      n.type === ElementType.LINK,
  });
};
