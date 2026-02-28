import { FC, useRef } from "react";
import { Editor } from "slate";
import Button from "../../common/Button";
import { ElementType } from "../../types/element";
import Icon from "../../common/Icon";
import { EmbedData, insertEmbed } from "../../utils/embed";

type ImageButtonProps = {
  editor: Editor;
  format: ElementType;
  tooltip?: string;
};

const ImageButton: FC<ImageButtonProps> = ({ editor, format, tooltip }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Button
      format={format}
      tooltip={tooltip}
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          console.log(e.target.files);
          if (e.target.files?.length) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            const imageData: EmbedData = {
              url,
              alt: file.name,
            };
            const img = new Image();
            img.src = url;
            img.onload = () => {
              const imagOriginWidth = img.naturalWidth;
              insertEmbed(
                editor,
                {
                  ...imageData,
                  width: imagOriginWidth,
                },
                format,
              );
            };
          }
        }}
      />
      <Icon icon={format} />
    </Button>
  );
};

export default ImageButton;
