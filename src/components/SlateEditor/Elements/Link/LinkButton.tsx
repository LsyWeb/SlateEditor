import { insertLink, removeLink } from "../../utils/link";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { isBlockActive } from "../../utils/SlateUtilityFunctions";
import { ElementType } from "../../types/element";
import { Editor, Range, Transforms } from "slate";
import { FC, useContext } from "react";
import { getSelectedTextDom } from "../../utils/dom";
import usePopup from "../../common/PopupCard/hook";
import PopupCard from "../../common/PopupCard";
import LinkForm from "../../common/LinkForm";
import { StateContext } from "../../context";
import { replaceText, setNodeProperty } from "../../utils";

type LinkButtonProps = {
  editor: Editor;
  tooltip?: string;
};
const LinkButton: FC<LinkButtonProps> = ({ editor, tooltip }) => {
  const state = useContext(StateContext);
  const popup = usePopup();
  const { selection } = editor;
  const handleInsertLink = async () => {
    if (!selection) return;
    // 如果已经是链接，删除链接
    const [parent, parentPath] = Editor.parent(editor, selection.focus.path);
    if ((parent as any).type === ElementType.LINK) {
      removeLink(editor);
      return;
    }

    // 如果是空选区（未选中内容），不处理
    if(selection && Range.isCollapsed(selection)) {
      return;
    }

    // 如果是选中文本，插入链接
    const text = selection ? Editor.string(editor, selection) : "链接";
    insertLink(editor, { text });
    
    // 获取选中文本的dom
    const dom = await getSelectedTextDom(editor);
    if (dom) {
      popup.show(dom);
      state.setLink({
        href: "",
        linkText: text,
      });
    }
  };

  return (
    <>
      <Button
        active={isBlockActive(editor, ElementType.LINK)}
        format={ElementType.LINK}
        onClick={handleInsertLink}
        tooltip={tooltip}
      >
        <Icon icon={ElementType.LINK} />
      </Button>
      <PopupCard {...popup}>
        <LinkForm
          onFinish={(values: any) => {
             // 设置选中文本
             replaceText(editor, values.text);
             // 设置链接
             setNodeProperty(editor, { type: ElementType.LINK, href: values.href });
             // 隐藏弹窗
             state.setLink({
               href: values.href,
               linkText: values.text,
             });
             popup.hide();
          }}
        ></LinkForm>
      </PopupCard>
    </>
  );
};

export default LinkButton;
