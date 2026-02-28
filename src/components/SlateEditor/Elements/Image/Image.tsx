"use client";
import React, { FC, useMemo, useRef, useState } from "react";
import {
  useSelected,
  useFocused,
  useSlateStatic,
  ReactEditor,
} from "slate-react";
import styles from "./Image.module.scss";
import { Popover, theme } from "antd";
import useOutsideClick from "../../utils/useOutsideClick";
import { Resizable } from "re-resizable";
import { setNodeProperty } from "../../utils";
import ImageTooltip from "./ImageTooltip";

type ImageProps = {
  attributes: any;
  element: any;
  children: any;
  alt?: string;
};

const CustomHandle = () => {
  return <div className={styles.customHandle}></div>;
};

const Image: FC<ImageProps> = ({ attributes, element, children }) => {
  const { url, width, height } = element;
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  const imageWrapper = useRef<HTMLDivElement>(null);

  useOutsideClick(imageWrapper, () => {
    setActive(false);
  });

  const [active, setActive] = useState(true);

  return (
    <div {...attributes} className={styles.elementImage}>
      <Resizable
        enable={
          active
            ? {
                topLeft: true,
                topRight: true,
                bottomLeft: true,
                bottomRight: true,
              }
            : false
        }
        lockAspectRatio
        handleWrapperStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        handleComponent={{
          topLeft: <CustomHandle />,
          topRight: <CustomHandle />,
          bottomLeft: <CustomHandle />,
          bottomRight: <CustomHandle />,
        }}
        onResizeStop={(e, direction, ele, delta) => {
          const newWidth = ele.clientWidth;
          const newHeight = ele.clientHeight;
          setNodeProperty(editor, element, {
            width: newWidth,
            height: newHeight,
          });
        }}
      >
        <Popover
          trigger={["click"]}
          content={<ImageTooltip editor={editor} element={element} />}
        >
          <div
            contentEditable={false}
            className="element-image-wrapper"
            ref={imageWrapper}
            onClick={() => {
              setActive(true);
            }}
            style={{
              borderColor: active
                ? ` ${theme.defaultConfig.token.colorPrimary}`
                : "",
            }}
          >
            {/* eslint-disable @next/next/no-img-element */}
            <img
              alt={element.alt}
              src={url}
              data-width={width}
              data-height={height}
            />
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </Popover>
      </Resizable>
    </div>
  );
};
export default Image;
