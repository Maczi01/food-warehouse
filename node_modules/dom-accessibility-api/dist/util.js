"use strict";

exports.__esModule = true;
exports.isElement = isElement;
exports.isHTMLInputElement = isHTMLInputElement;
exports.isHTMLSelectElement = isHTMLSelectElement;
exports.isHTMLTextAreaElement = isHTMLTextAreaElement;
exports.safeWindow = safeWindow;

function isElement(node) {
  return (// @ts-ignore
    node !== null && node instanceof node.ownerDocument.defaultView.Element
  );
}

function isHTMLInputElement(node) {
  return isElement(node) && // @ts-ignore
  node instanceof node.ownerDocument.defaultView.HTMLInputElement;
}

function isHTMLSelectElement(node) {
  return isElement(node) && // @ts-ignore
  node instanceof node.ownerDocument.defaultView.HTMLSelectElement;
}

function isHTMLTextAreaElement(node) {
  return isElement(node) && // @ts-ignore
  node instanceof node.ownerDocument.defaultView.HTMLTextAreaElement;
}

function safeWindow(node) {
  var _ref = node.ownerDocument === null ? node : node.ownerDocument,
      defaultView = _ref.defaultView;

  if (defaultView === null) {
    throw new TypeError("no window available");
  }

  return defaultView;
}
//# sourceMappingURL=util.js.map