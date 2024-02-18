import { ElementType } from "../types/element";
import { ToolbarGroup } from "../types/toolbar";

const toolbarGroups: ToolbarGroup = [
  [
    {
      id: 1,
      format: ElementType.HEADER,
      type: "dropdown",
      options: [
        { label: "正文", value: '0' },
        { label: "标题1", value: '1' },
        { label: "标题2", value: '2' },
        { label: "标题3", value: '3' },
        { label: "标题4", value: '4' },
      ],
      tooltip: "正文与标题",
    },
    {
      id: 2,
      format: ElementType.FONT_SIZE,
      type: "dropdown",
      options: [
        { label: "12px", value: '12' },
        { label: "14px", value: '14' },
        { label: "16px", value: '16' },
        { label: "17px", value: '17' },
        { label: "18px", value: '18' },
        { label: "20px", value: '20' },
        { label: "22px", value: '22' },
        { label: "24px", value: '24' },
        { label: "26px", value: '26' },
        { label: "32px", value: '32' },
        { label: "36px", value: '36' },
        { label: "48px", value: '48' },
        { label: "72px", value: '72' },
      ],
      tooltip: "字体大小",
    },
  ],
  [
    {
      id: 3,
      format: ElementType.BOLD,
      type: "mark",
      tooltip: "加粗",
    },
    {
      id: 4,
      format: ElementType.ITALIC,
      type: "mark",
      tooltip: "斜体",
    },
    {
      id: 5,
      format: ElementType.UNDERLINE,
      type: "mark",
      tooltip: "下划线",
    },
    {
      id: 6,
      format: ElementType.STRIKETHROUGH,
      type: "mark",
      tooltip: "删除线",
    },
  ],
  [
    {
      id: 7,
      format: ElementType.FONT_COLOR,
      type: "color-picker",
      tooltip: "字体颜色",
    },
    {
      id: 8,
      format: ElementType.FONT_BG_COLOR,
      type: "color-picker",
      tooltip: "字体背景颜色",
    },
  ],
  [
    {
      id: 15,
      format: ElementType.OL,
      type: "block",
      tooltip: "有序列表",
    },
    {
      id: 16,
      format: ElementType.UL,
      type: "block",
      tooltip: "无序列表",
    },
  ],
  [
    {
      id: 17,
      format: ElementType.ALIGN_LEFT,
      type: "block",
      tooltip: "内容居左",
    },
    {
      id: 18,
      format: ElementType.ALIGN_CENTER,
      type: "block",
      tooltip: "内容居中",
    },
    {
      id: 19,
      format: ElementType.ALIGN_RIGHT,
      type: "block",
      tooltip: "内容居右",
    },
  ],
  [
    {
      id: 20,
      format: ElementType.LINK,
      type: "link",
      tooltip: "链接",
    },
    {
      id: 21,
      format: ElementType.IMAGE,
      type: "embed",
      tooltip: "图片",
    },
    {
      id: 23,
      format: ElementType.TABLE,
      type: "table",
      tooltip: "表格",
    },
  ],

  [
    {
      id: 24,
      format: ElementType.IN_TABLE,
      type: "inTable",
    },
  ],
];

export default toolbarGroups;
