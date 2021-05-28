export function isElement(node) {
  return (// @ts-ignore
    node !== null && node instanceof node.ownerDocument.defaultView.Element
  );
}
export function isHTMLInputElement(node) {
  return isElement(node) && // @ts-ignore
  node instanceof node.ownerDocument.defaultView.HTMLInputElement;
}
export function isHTMLSelectElement(node) {
  return isElement(node) && // @ts-ignore
  node instanceof node.ownerDocument.defaultView.HTMLSelectElement;
}
export function isHTMLTextAreaElement(node) {
  return isElement(node) && // @ts-ignore
  node instanceof node.ownerDocument.defaultView.HTMLTextAreaElement;
}
export function safeWindow(node) {
  var _ref = node.ownerDocument === null ? node : node.ownerDocument,
      defaultView = _ref.defaultView;

  if (defaultView === null) {
    throw new TypeError("no window available");
  }

  return defaultView;
}
//# sourceMappingURL=util.mjs.map