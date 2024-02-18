"use client";
import React, { FC, useCallback, useContext, useMemo, useState } from "react";
import { Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import Toolbar from "./Toolbar/Toolbar";
import withLinks from "./plugins/withLinks";
import withTables from "./plugins/withTable";
import withEmbeds from "./plugins/withEmbeds";
import styles from "./Editor.module.scss";
import Link from "./Elements/Link/Link";
import Image from "./Elements/Image/Image";
import Video from "./Elements/Video/Video";
import { ElementType } from "./types/element";
import { StateProvider } from "./context";

const Element = (props: any) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case ElementType.BLOCKQUOTE:
      return <blockquote {...attributes}>{children}</blockquote>;
    case ElementType.ALIGN_LEFT:
      return (
        <div
          style={{ textAlign: "left", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case ElementType.ALIGN_CENTER:
      return (
        <div
          style={{ textAlign: "center", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case ElementType.ALIGN_RIGHT:
      return (
        <div
          style={{ textAlign: "right", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case ElementType.LIST_ITEM:
      return <li {...attributes}>{children}</li>;
    case ElementType.OL:
      return (
        <ol type="1" {...attributes}>
          {children}
        </ol>
      );
    case ElementType.UL:
      return <ul {...attributes}>{children}</ul>;
    case ElementType.LINK:
      return <Link {...props} />;

    case ElementType.TABLE:
      return (
        <table>
          <tbody {...attributes}>{children}</tbody>
        </table>
      );
    case "table-row":
      return <tr {...attributes}>{children}</tr>;
    case "table-cell":
      return <td {...attributes}>{children}</td>;
    case ElementType.IMAGE:
      return <Image {...props} />;
    // case ElementType.ViDEO:
    //   return <Video {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.header) {
    if (leaf.header === "1") {
      children = <h1 {...attributes}>{children}</h1>;
    } else if (leaf.header === "2") {
      children = <h2 {...attributes}>{children}</h2>;
    } else if (leaf.header === "3") {
      children = <h3 {...attributes}>{children}</h3>;
    } else if (leaf.header === "4") {
      children = <h4 {...attributes}>{children}</h4>;
    }
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.strikethrough) {
    children = (
      <span style={{ textDecoration: "line-through" }}>{children}</span>
    );
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }
  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }
  if (leaf.fontColor) {
    children = <span style={{ color: leaf.fontColor }}>{children}</span>;
  }
  if (leaf.bgColor) {
    children = (
      <span style={{ backgroundColor: leaf.bgColor }}>{children}</span>
    );
  }
  if (leaf.fontSize) {
    children = (
      <span style={{ fontSize: leaf.fontSize + "px" }}>{children}</span>
    );
  }

  return <span {...attributes}>{children}</span>;
};
/**
 * slate编辑器组件Props
 */
type SlateEditorProps = {
  /**
   * 编辑器初始值
   */
  initialValue: Descendant[];
  /**
   * 编辑器内容改变时触发
   */
  onChange?: (value: Descendant[]) => void;
};

/**
 * slate编辑器组件
 */
const SlateEditor: FC<SlateEditorProps> = ({ initialValue, onChange }) => {
  const [link, setLink] = useState({ href: "", linkText: "" });

  const editor = useMemo(
    () =>
      withHistory(withEmbeds(withTables(withLinks(withReact(createEditor()))))),
    [],
  );

  const renderElement = useCallback((props: any) => <Element {...props} />, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <StateProvider value={{ link, setLink }}>
      <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
        <div className={styles.editorWrapper}>
          <Toolbar />
          <Editable
            className="editor"
            placeholder="请输入内容"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </div>
      </Slate>
    </StateProvider>
  );
};

export default SlateEditor;
