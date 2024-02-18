import React, { FC, useContext, useState } from "react";
import { ReactEditor, useSlateStatic } from "slate-react";
import { Button, Popover, Space, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { LinkElement } from "../../types";
import { removeLink } from "../../utils/link";
import { StateContext } from "../../context";
import { getElementDom } from "../../utils/dom";
import styles from "./index.module.scss";
import usePopup from "../../common/PopupCard/hook";

import LinkForm from "../../common/LinkForm";
import { ElementType } from "../../types/element";
import { replaceText, setNodeProperty } from "../../utils";
import dynamic from "next/dynamic";

const PopupCard = dynamic(() => import('../../common/PopupCard'), {
  ssr: false,
})

type LinkProps = {
  attributes: any;
  element: LinkElement;
  children: any;
};

const Link: FC<LinkProps> = ({ attributes, element, children }) => {
  const state = useContext(StateContext);
  const popup = usePopup();
  const editor = useSlateStatic();

  const [popoverVisible, setPopoverVisible] = useState(false);

  return (
    <div
      className={styles.link}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Popover
        open={popoverVisible}
        onOpenChange={setPopoverVisible}
        overlayInnerStyle={{ padding: 8 }}
        content={
          <Space>
            <Tooltip title="访问链接">
              <Button
                type="text"
                href={element.href}
                target="_blank"
                size="small"
                icon={<ShareAltOutlined />}
              />
            </Tooltip>
            <Tooltip title="编辑链接">
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={async () => {
                  setPopoverVisible(false);
                  const dom = getElementDom(editor, element);

                  if (dom) {
                    popup.show(dom);
                    state.setLink({
                      href: element.href,
                      linkText: element.children[0].text || element.linkText,
                    });
                  }
                }}
              />
            </Tooltip>
            <Tooltip title="取消链接">
              <Button
                type="text"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => {
                  setPopoverVisible(false);
                  removeLink(editor);
                }}
              />
            </Tooltip>
          </Space>
        }
      >
        <a href={element.href} {...attributes}>
          {children}
        </a>
      </Popover>
      <PopupCard {...popup}>
        <LinkForm
          onFinish={(values) => {
            // 设置选中文本
            replaceText(editor, values.text);
            // 设置链接
            setNodeProperty(editor, {
              type: ElementType.LINK,
              href: values.href,
            });
           
            state.setLink({
              href: values.href,
              linkText: values.text,
            });
             // 隐藏弹窗
            popup.hide();
          }}
        />
      </PopupCard>
    </div>
  );
};

export default Link;
