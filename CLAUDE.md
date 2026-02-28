# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此代码库中工作时提供指导。

## 常用命令

```bash
npm run dev      # 启动开发服务器 (localhost:3000)
npm run build    # 生产构建
npm run lint     # ESLint 检查
```

## 架构概览

这是一个基于 **Slate.js** 构建的 **Next.js 14** 富文本编辑器应用。核心编辑器是一个独立组件，位于 `src/components/SlateEditor/`。

### 编辑器插件管道

`Editor.tsx` 通过叠加插件来组合 Slate 编辑器：

```
withHistory(withEmbeds(withTables(withLinks(withReact(createEditor()))))
```

- `withLinks` — 将 `link` 元素类型标记为内联
- `withEmbeds` — 将 `video` 和 `image` 标记为内联
- `withTable` — 重写 `deleteBackward`、`deleteForward`、`insertBreak`，防止跨单元格编辑

### Marks 与 Blocks 的区分

这一区分驱动了整个格式化系统：

- **Marks**（叶子级，内联）：`bold`、`italic`、`underline`、`strikethrough`、`code`、`superscript`、`subscript`、`fontColor`、`bgColor`、`fontSize`、`header`
- **Blocks**（元素级）：`paragraph`、`alignLeft/Center/Right`、`blockquote`、`orderedList`、`unorderedList`、`list-item`、`link`、`image`、`table`

对齐块使用 `wrapNodes`/`unwrapNodes` 而非 `setNodes`，以便与其他块级操作共存（见 `SlateUtilityFunctions.ts`）。

### 工具栏系统

工具栏项在 `Toolbar/toolbarGroups.ts` 中以 `ToolbarGroup`（二维数组，外层数组对应视觉分组）形式声明。每个项的 `type` 字段决定 `Toolbar/Toolbar.tsx` 中渲染哪个组件：

| type | 组件 |
|------|------|
| `"mark"` | `MarkButton` |
| `"block"` | `BlockButton` |
| `"dropdown"` | `DropdownButton`（用于标题级别、字体大小） |
| `"color-picker"` | `ColorPicker` |
| `"link"` | `LinkButton` |
| `"image"` | `ImageButton`（动态导入，`ssr: false`） |
| `"table"` | `Table` |
| `"inTable"` | `InTable`（仅在光标位于表格内时渲染） |

添加新工具栏按钮的步骤：在 `toolbarGroups.ts` 中添加条目、在 `types/element.ts` 中添加 `ElementType` 枚举值、在 `Toolbar.tsx` 的 switch 语句中添加 case、在 `Editor.tsx` 的 `Element` 或 `Leaf` 组件中处理渲染。

### 关键文件

- `types/element.ts` — `ElementType` 枚举，所有元素/mark 类型字符串的唯一来源
- `types/index.d.ts` — Slate 模块扩展声明（`CustomElement`、`LinkElement`、`ImageElement`、`CustomText`）
- `utils/SlateUtilityFunctions.ts` — `toggleBlock`、`toggleMark`、`isMarkActive`、`isBlockActive`、`addMarkData`、`activeMark`
- `context/index.ts` — `StateContext`，在编辑器各组件间共享链接状态（`href`、`linkText`）

### 样式

所有组件样式使用 CSS Modules（`.module.scss`）。部分元素（Table、Video）保留了历史遗留的 `.css` 文件。

### 状态管理

`SlateEditor` 组件接受 `initialValue: Descendant[]` 和 `onChange: (value: Descendant[]) => void`，由父组件（`page.tsx`）持有文档状态。`StateContext` 包裹整个编辑器，用于在 `LinkButton` 和 `Link` 元素之间共享链接编辑状态。
