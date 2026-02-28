import { FC } from "react";
import styles from "./Image.module.scss";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { ElementType } from "../../types/element";
import { Editor, Element, Transforms } from "slate";
import { getElementPath, setNodeProperty } from "../../utils";
type ImageTooltipProps = {
  editor: Editor;
  element: Element;
};

type ImageTootipColumn = {
  key: string;
  tootip: string;
  icon: ElementType | "delete";
  handle?: () => void;
};

const ImageTooltip: FC<ImageTooltipProps> = ({ editor, element }) => {
  const handleImageAlign = (align: "left" | "center" | "right") => {
    setNodeProperty(editor, element, { align });
  };
  const ImageTootipColumns: ImageTootipColumn[] = [
    {
      key: "align-left",
      tootip: "图片居左",
      icon: ElementType.ALIGN_LEFT,
      handle: () => {
        console.log('left')
        handleImageAlign("left");
      },
    },
    {
      key: "align-center",
      tootip: "图片居中",
      icon: ElementType.ALIGN_CENTER,
      handle: () => {
        handleImageAlign("center");
      },
    },
    {
      key: "align-right",
      tootip: "图片居右",
      icon: ElementType.ALIGN_RIGHT,
      handle: () => {
        handleImageAlign("right");
      },
    },
    {
      key: "delete",
      tootip: "删除",
      icon: "delete",
      handle: () => {
        Transforms.removeNodes(editor, { at: getElementPath(editor, element) });
      },
    },
  ];
  return (
    <div className={styles.imageTooltip}>
      {ImageTootipColumns.map((item) => {
        return (
          <Button tooltip={item.tootip} key={item.key} onClick={() => item.handle?.()}>
            <Icon icon={item.icon} />
          </Button>
        );
      })}
    </div>
  );
};

export default ImageTooltip;
