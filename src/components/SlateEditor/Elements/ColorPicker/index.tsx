import { FC, useMemo, useState } from "react";
import { BaseSelection, Editor, Transforms } from "slate";
import Icon from "../../common/Icon";
import Button from "../../common/Button";
import { ElementType } from "../../types/element";
import { BlockPicker, SketchPicker } from "react-color";
import { Popover } from "antd";
import { activeMark, addMarkData } from "../../utils/SlateUtilityFunctions";
import { ReactEditor } from "slate-react";

type ColorPickerProps = {
  format: ElementType;
  editor: Editor;
};

const ColorPicker: FC<ColorPickerProps> = ({ format, editor }) => {
  const [selection, setSelection] = useState<BaseSelection>();

  const [open, setOpen] = useState(false);

  const [value, setValue] = useState<string>("black");

  // 隐藏颜色选择卡片
  const hidePopover = () => {
    setOpen(false);
    setSelection(undefined);
  };

  const handleHexChange = (val: string) => {
    setValue(val);
    selection && Transforms.select(editor, selection);

    addMarkData(editor, { format, value: val }); // 设置选中文本的颜色

    ReactEditor.focus(editor);
    Transforms.move(editor, {
      distance: 1,
    });

    hidePopover();
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={["click"]}
      content={
        <SketchPicker
          width="220px"
          styles={{
            default: {
              picker: { border: "none", boxShadow: "none", padding: "none" },
            },
          }}
          color={value}
          onChangeComplete={(e) => {
            const hex = e.hex;
            handleHexChange(hex);
          }}
        />
      }
    >
      <div>
        <Button
          format={format}
          onClick={() => {
            if (!selection) {
              setSelection(editor.selection);
            }
          }}
        >
          <Icon icon={format} />
          <div
            style={{
              width: 16,
              height: 2,
              backgroundColor: activeMark(editor, format),
            }}
          ></div>
        </Button>
      </div>
    </Popover>
  );
};

export default ColorPicker;
