import React, { FC } from "react";
import { useSelected, useFocused } from "slate-react";
import "./Image.css";

type ImageProps = {
  attributes: any;
  element: any;
  children: any;
};

const Image: FC<ImageProps> = ({ attributes, element, children }) => {
  const { url, width, height } = element;
  const selected = useSelected();
  const focused = useFocused();
  console.log(width, height);
  return (
    <div
      {...attributes}
      className="element-image"
      style={{
        display: "flex",
        justifyContent: "center",
        boxShadow: selected && focused && "0 0 3px 3px lightgray",
      }}
    >
      <div contentEditable={false} style={{ width: width, height: height }}>
        <img alt={element.alt} src={url} />
      </div>
      {children}
    </div>
  );
};
export default Image;
