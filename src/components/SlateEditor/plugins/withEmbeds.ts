const withEmbeds = (editor: any) => {
  const { isInline } = editor;

  editor.isInline = (element: any) =>
    ["video", "image"].includes(element.type) ? true : isInline(element);
  return editor;
};

export default withEmbeds;
