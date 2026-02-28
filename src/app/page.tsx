"use client";
import SlateEditor from "@/components/SlateEditor/Editor";
import "./page.css";
import { ConfigProvider } from "antd";
import { useState } from "react";
import { Descendant } from "slate";
import { ElementType } from "@/components/SlateEditor/types/element";

export default function Home() {
  const [value, setValue] = useState<Descendant[]>([
    {
      type: ElementType.PARAGRAPH,
      children: [
        {
          text: "First line of text in Slate JS.First line of text in Slate JS.First line of text in Slate JS.First line of text in Slate JS. ",
        },
      ],
    },
  ]);

  return (
    <ConfigProvider>
      <div className="home-wrapper">
        <SlateEditor
          initialValue={value}
          onChange={(v) => {
            console.log(v);
            setValue(v);
          }}
        />
      </div>
    </ConfigProvider>
  );
}
