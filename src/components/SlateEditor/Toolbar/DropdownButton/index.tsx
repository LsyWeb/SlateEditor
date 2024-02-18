import { DownOutlined } from "@ant-design/icons";
import { Dropdown, DropdownProps, Space, Tooltip } from "antd";
import { useMemo } from "react";
import { ElementType } from "../../types/element";
import { ToolbarOptions } from "../../types/toolbar";
import { activeMark, addMarkData } from "../../utils/SlateUtilityFunctions";
import { useSlate } from "slate-react";
import styles from "./index.module.scss";

type DropdownButtonProps = {
  format: ElementType;
  options?: ToolbarOptions;
  trigger?: DropdownProps["trigger"];
  tooltip?: string;
};

const DropdownButton = ({
  format,
  options,
  trigger,
  tooltip,
}: DropdownButtonProps) => {
  const editor = useSlate();

  const items = useMemo(
    () =>
      options?.map((item) => ({
        key: item.value,
        value: item.value,
        label: item.label,
      })),
    [options],
  );

  const changeMarkData = (value: number | string) => {
    addMarkData(editor, { format, value });
  };

  return (
    <Dropdown
      trigger={trigger || ["click"]}
      menu={{
        items,
        onClick: ({ key }) => {
          changeMarkData(key);
        },
      }}
    >
      <Tooltip title={tooltip} trigger={["hover"]}>
        <div className={styles.dropdownWrapper}>
          {
            items?.find((item) => activeMark(editor, format) === item.key)
              ?.label
          }
          <DownOutlined style={{ fontSize: 10 }} />
        </div>
      </Tooltip>
    </Dropdown>
  );
};

export default DropdownButton;
