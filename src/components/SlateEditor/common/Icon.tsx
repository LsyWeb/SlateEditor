import { FC, ReactNode } from "react";

import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BgColorsOutlined,
  BoldOutlined,
  DeleteOutlined,
  FontColorsOutlined,
  ItalicOutlined,
  LinkOutlined,
  OrderedListOutlined,
  PictureOutlined,
  StrikethroughOutlined,
  TableOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { ElementType } from "../types/element";

type IconProps = {
  icon: ElementType | "delete";
};

const IconMap: Record<string, ReactNode> = {
  [ElementType.BOLD]: <BoldOutlined />,
  [ElementType.ITALIC]: <ItalicOutlined />,
  [ElementType.UNDERLINE]: <UnderlineOutlined />,
  [ElementType.STRIKETHROUGH]: <StrikethroughOutlined />,
  [ElementType.OL]: <OrderedListOutlined />,
  [ElementType.UL]: <UnorderedListOutlined />,
  [ElementType.FONT_COLOR]: (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4409"
      width="14"
      height="14"
    >
      <path
        d="M792.864 922.112l103.584-2.176L572.576 110.24h-89.184L161.696 919.936H264l66.944-167.936h394.112l67.808 170.112zM369.216 656L528 257.632 686.784 656h-317.568z"
        p-id="4410"
      ></path>
    </svg>
  ),
  [ElementType.FONT_BG_COLOR]: (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6282"
      width="14"
      height="14"
    >
      <path
        d="M84.032 529.92a32 32 0 0 1 0-45.248l384.64-384.64a32 32 0 0 1 45.28 0l362.016 362.016a32 32 0 0 1 0 45.28l-384.64 384.64a32 32 0 0 1-42.464 2.496l-2.816-2.496L84.032 529.952z m724.064-45.248l-316.8-316.768L154.432 504.768l651.168-17.6 2.528-2.496zM896 768a64 64 0 0 0 64-64c0-23.552-21.344-66.24-64-128-42.656 61.76-64 104.448-64 128a64 64 0 0 0 64 64z"
        p-id="6283"
      ></path>
    </svg>
  ),
  [ElementType.TABLE]: <TableOutlined />,
  [ElementType.LINK]: <LinkOutlined />,
  [ElementType.BLOCKQUOTE]: (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5858"
      width="16"
      height="16"
    >
      <path
        d="M195.2 458.24a259.84 259.84 0 0 1 177.92-160c92.16-29.44 47.04-128-34.56-102.72C146.56 249.28 32 395.52 32 586.56 32 736 117.12 832 249.28 832s215.04-79.68 215.04-203.52c0-177.28-168-219.52-269.12-170.24z m527.68 0a259.84 259.84 0 0 1 177.92-160c91.2-29.12 48-128-34.56-102.72-192 54.08-306.56 200-306.56 391.36 0 149.12 85.44 245.12 217.28 245.12S992 752.32 992 628.48c0-176.64-167.04-219.84-269.12-170.24z"
        fill="#231F20"
        p-id="5859"
      ></path>
    </svg>
  ),
  [ElementType.IMAGE]: <PictureOutlined />,
  delete: <DeleteOutlined />,
  [ElementType.ALIGN_LEFT]: <AlignLeftOutlined />,
  [ElementType.ALIGN_CENTER]: <AlignCenterOutlined />,
  [ElementType.ALIGN_RIGHT]: <AlignRightOutlined />,
};

const Icon: FC<IconProps> = ({ icon }) => {
  return IconMap[icon];
};

export default Icon;
