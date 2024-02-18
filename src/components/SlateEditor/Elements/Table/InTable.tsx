import React, { FC } from "react";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { TableUtil } from "../../utils/table";
import { Editor } from "slate";

type InTableProps = {
  editor: Editor;
};
const InTable: FC<InTableProps> = ({ editor }) => {
  const table = new TableUtil(editor);

  const handleButtonClick = (action: "row" | "column" | "remove") => {
    switch (action) {
      case "row":
        table.insertRow();
        break;
      case "column":
        table.insertColumn();
        break;
      case "remove":
        table.removeTable();
        break;
      default:
        return;
    }
  };
  return (
    <>
      <Button format="insert row" onClick={() => handleButtonClick("row")}>
        添加一行
      </Button>
      <Button
        format="insert column"
        onClick={() => handleButtonClick("column")}
      >
        添加一列
      </Button>
      <Button format="remove table" onClick={() => handleButtonClick("remove")}>
        <Icon icon="delete" />
      </Button>
    </>
  );
};

export default InTable;
