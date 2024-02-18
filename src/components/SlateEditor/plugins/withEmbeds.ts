const withEmbeds = (editor: any) => {
  const { isVoid } = editor;

  editor.isVoid = (element: any) =>
    ["video", "image"].includes(element.type) ? true : isVoid(element);
  return editor;
};

export default withEmbeds;
