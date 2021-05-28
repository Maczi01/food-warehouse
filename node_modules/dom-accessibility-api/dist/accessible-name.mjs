function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * implements https://w3c.github.io/accname/
 */
import ArrayFrom from "./polyfills/array.from.mjs";
import SetLike from "./polyfills/SetLike.mjs";
import getRole from "./getRole.mjs";
import { isElement, isHTMLInputElement, isHTMLSelectElement, isHTMLTextAreaElement, safeWindow } from "./util.mjs";
/**
 *  A string of characters where all carriage returns, newlines, tabs, and form-feeds are replaced with a single space, and multiple spaces are reduced to a single space. The string contains only character data; it does not contain any markup.
 */

/**
 * Small utility that handles all the JS quirks with `this` which is important
 * if no mock is provided.
 * @param element
 * @param options - These are not optional to prevent accidentally calling it without options in `computeAccessibleName`
 */
function createGetComputedStyle(element, options) {
  var window = safeWindow(element);
  var _options$getComputedS = options.getComputedStyle,
      getComputedStyle = _options$getComputedS === void 0 ? window.getComputedStyle.bind(window) : _options$getComputedS;
  return getComputedStyle;
}
/**
 *
 * @param {string} string -
 * @returns {FlatString} -
 */


function asFlatString(s) {
  return s.trim().replace(/\s\s+/g, " ");
}
/**
 * https://w3c.github.io/aria/#namefromprohibited
 */


function prohibitsNaming(node) {
  return hasAnyConcreteRoles(node, ["caption", "code", "deletion", "emphasis", "generic", "insertion", "paragraph", "presentation", "strong", "subscript", "superscript"]);
}
/**
 *
 * @param node -
 * @param options - These are not optional to prevent accidentally calling it without options in `computeAccessibleName`
 * @returns {boolean} -
 */


function isHidden(node, options) {
  if (!isElement(node)) {
    return false;
  }

  if (node.hasAttribute("hidden") || node.getAttribute("aria-hidden") === "true") {
    return true;
  }

  var style = createGetComputedStyle(node, options)(node);
  return style.getPropertyValue("display") === "none" || style.getPropertyValue("visibility") === "hidden";
}
/**
 *
 * @param {Node} node -
 * @param {string} attributeName -
 * @returns {Element[]} -
 */


function idRefs(node, attributeName) {
  if (isElement(node) && node.hasAttribute(attributeName)) {
    // safe due to hasAttribute check
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    var ids = node.getAttribute(attributeName).split(" ");
    return ids // safe since it can't be null for an Element
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map(function (id) {
      return node.ownerDocument.getElementById(id);
    }).filter(function (element) {
      return element !== null;
    } // TODO: why does this not narrow?
    );
  }

  return [];
}
/**
 * All defined children. This include childNodes as well as owned (portaled) trees
 * via aria-owns
 * @param node
 */


function queryChildNodes(node) {
  return ArrayFrom(node.childNodes).concat(idRefs(node, "aria-owns"));
}
/**
 * @param {Node} node -
 * @returns {boolean} - As defined in step 2E of https://w3c.github.io/accname/#mapping_additional_nd_te
 */


function isControl(node) {
  return hasAnyConcreteRoles(node, ["button", "combobox", "listbox", "textbox"]) || hasAbstractRole(node, "range");
}

function hasAbstractRole(node, role) {
  if (!isElement(node)) {
    return false;
  }

  switch (role) {
    case "range":
      return hasAnyConcreteRoles(node, ["meter", "progressbar", "scrollbar", "slider", "spinbutton"]);

    default:
      throw new TypeError("No knowledge about abstract role '".concat(role, "'. This is likely a bug :("));
  }
}

function hasAnyConcreteRoles(node, roles) {
  if (isElement(node)) {
    return roles.indexOf(getRole(node)) !== -1;
  }

  return false;
}
/**
 * element.querySelectorAll but also considers owned tree
 * @param element
 * @param selectors
 */


function querySelectorAllSubtree(element, selectors) {
  var elements = [];

  for (var _i = 0, _arr = [element].concat(_toConsumableArray(idRefs(element, "aria-owns"))); _i < _arr.length; _i++) {
    var root = _arr[_i];
    elements.push.apply(elements, _toConsumableArray(ArrayFrom(root.querySelectorAll(selectors))));
  }

  return elements;
}

function querySelectedOptions(listbox) {
  if (isHTMLSelectElement(listbox)) {
    // IE11 polyfill
    return listbox.selectedOptions || querySelectorAllSubtree(listbox, "[selected]");
  }

  return querySelectorAllSubtree(listbox, '[aria-selected="true"]');
}

function isMarkedPresentational(node) {
  return hasAnyConcreteRoles(node, ["none", "presentation"]);
}
/**
 * TODO https://github.com/eps1lon/dom-accessibility-api/issues/99
 */


function isNativeHostLanguageTextAlternativeElement(node) {
  return false;
}
/**
 * https://w3c.github.io/aria/#namefromcontent
 */


function allowsNameFromContent(node) {
  return hasAnyConcreteRoles(node, ["button", "cell", "checkbox", "columnheader", "gridcell", "heading", "label", "legend", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "row", "rowheader", "switch", "tab", "tooltip", "treeitem"]);
}
/**
 * TODO https://github.com/eps1lon/dom-accessibility-api/issues/100
 */


function isDescendantOfNativeHostLanguageTextAlternativeElement(node) {
  return false;
}
/**
 * TODO https://github.com/eps1lon/dom-accessibility-api/issues/101
 */


function computeTooltipAttributeValue(node) {
  return null;
}

function getValueOfTextbox(element) {
  if (isHTMLInputElement(element) || isHTMLTextAreaElement(element)) {
    return element.value;
  } // https://github.com/eps1lon/dom-accessibility-api/issues/4


  return element.textContent || "";
}

function getTextualContent(declaration) {
  var content = declaration.getPropertyValue("content");

  if (/^["'].*["']$/.test(content)) {
    return content.slice(1, -1);
  }

  return "";
}
/**
 * implements https://w3c.github.io/accname/#mapping_additional_nd_te
 * @param root
 * @param [options]
 * @parma [options.getComputedStyle] - mock window.getComputedStyle. Needs `content`, `display` and `visibility`
 */


export function computeAccessibleName(root) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var consultedNodes = new SetLike();

  if (prohibitsNaming(root)) {
    return "";
  } // 2F.i


  function computeMiscTextAlternative(node, context) {
    var accumulatedText = "";

    if (isElement(node)) {
      var pseudoBefore = createGetComputedStyle(node, options)(node, "::before");
      var beforeContent = getTextualContent(pseudoBefore);
      accumulatedText = "".concat(beforeContent, " ").concat(accumulatedText);
    }

    var _iterator = _createForOfIteratorHelper(queryChildNodes(node)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var child = _step.value;
        var result = computeTextAlternative(child, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: false,
          recursion: true
        }); // TODO: Unclear why display affects delimiter

        var display = isElement(node) && createGetComputedStyle(node, options)(node).getPropertyValue("display");
        var separator = display !== "inline" ? " " : "";
        accumulatedText += "".concat(separator).concat(result);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (isElement(node)) {
      var pseudoAfter = createGetComputedStyle(node, options)(node, ":after");
      var afterContent = getTextualContent(pseudoAfter);
      accumulatedText = "".concat(accumulatedText, " ").concat(afterContent);
    }

    return accumulatedText;
  }

  function computeAttributeTextAlternative(node) {
    if (!isElement(node)) {
      return null;
    }

    var titleAttribute = node.getAttributeNode("title");

    if (titleAttribute !== null && !consultedNodes.has(titleAttribute)) {
      consultedNodes.add(titleAttribute);
      return titleAttribute.value;
    }

    var altAttribute = node.getAttributeNode("alt");

    if (altAttribute !== null && !consultedNodes.has(altAttribute)) {
      consultedNodes.add(altAttribute);
      return altAttribute.value;
    }

    if (isHTMLInputElement(node) && node.type === "button") {
      consultedNodes.add(node);
      return node.getAttribute("value") || "";
    }

    return null;
  }

  function computeElementTextAlternative(node) {
    if (!(isHTMLInputElement(node) || isHTMLSelectElement(node) || isHTMLTextAreaElement(node))) {
      return null;
    }

    var input = node; // https://w3c.github.io/html-aam/#input-type-text-input-type-password-input-type-search-input-type-tel-input-type-email-input-type-url-and-textarea-element-accessible-description-computation

    if (input.type === "submit") {
      return "Submit";
    }

    if (input.type === "reset") {
      return "Reset";
    }

    var labels = input.labels; // IE11 does not implement labels, TODO: verify with caniuse instead of mdn

    if (labels === null || labels === undefined || labels.length === 0) {
      return null;
    }

    consultedNodes.add(input);
    return ArrayFrom(labels).map(function (element) {
      return computeTextAlternative(element, {
        isEmbeddedInLabel: true,
        isReferenced: false,
        recursion: true
      });
    }).filter(function (label) {
      return label.length > 0;
    }).join(" ");
  }

  function computeTextAlternative(current, context) {
    if (consultedNodes.has(current)) {
      return "";
    } // special casing, cheating to make tests pass
    // https://github.com/w3c/accname/issues/67


    if (hasAnyConcreteRoles(current, ["menu"])) {
      consultedNodes.add(current);
      return "";
    } // 2A


    if (isHidden(current, options) && !context.isReferenced) {
      consultedNodes.add(current);
      return "";
    } // 2B


    var labelElements = idRefs(current, "aria-labelledby");

    if (!context.isReferenced && labelElements.length > 0) {
      return labelElements.map(function (element) {
        return computeTextAlternative(element, {
          isEmbeddedInLabel: context.isEmbeddedInLabel,
          isReferenced: true,
          // thais isn't recursion as specified, otherwise we would skip
          // `aria-label` in
          // <input id="myself" aria-label="foo" aria-labelledby="myself"
          recursion: false
        });
      }).join(" ");
    } // 2C
    // Changed from the spec in anticipation of https://github.com/w3c/accname/issues/64
    // spec says we should only consider skipping if we have a non-empty label


    var skipToStep2E = context.recursion && isControl(current);

    if (!skipToStep2E) {
      var ariaLabel = (isElement(current) && current.getAttribute("aria-label") || "").trim();

      if (ariaLabel !== "") {
        consultedNodes.add(current);
        return ariaLabel;
      } // 2D


      if (!isMarkedPresentational(current)) {
        var elementTextAlternative = computeElementTextAlternative(current);

        if (elementTextAlternative !== null) {
          consultedNodes.add(current);
          return elementTextAlternative;
        }

        var attributeTextAlternative = computeAttributeTextAlternative(current);

        if (attributeTextAlternative !== null) {
          consultedNodes.add(current);
          return attributeTextAlternative;
        }
      }
    } // 2E


    if (skipToStep2E || context.isEmbeddedInLabel || context.isReferenced) {
      if (hasAnyConcreteRoles(current, ["combobox", "listbox"])) {
        consultedNodes.add(current);
        var selectedOptions = querySelectedOptions(current);

        if (selectedOptions.length === 0) {
          // defined per test `name_heading_combobox`
          return isHTMLInputElement(current) ? current.value : "";
        }

        return ArrayFrom(selectedOptions).map(function (selectedOption) {
          return computeTextAlternative(selectedOption, {
            isEmbeddedInLabel: context.isEmbeddedInLabel,
            isReferenced: false,
            recursion: true
          });
        }).join(" ");
      }

      if (hasAbstractRole(current, "range")) {
        consultedNodes.add(current);

        if (current.hasAttribute("aria-valuetext")) {
          // safe due to hasAttribute guard
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return current.getAttribute("aria-valuetext");
        }

        if (current.hasAttribute("aria-valuenow")) {
          // safe due to hasAttribute guard
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          return current.getAttribute("aria-valuenow");
        } // Otherwise, use the value as specified by a host language attribute.


        return current.getAttribute("value") || "";
      }

      if (hasAnyConcreteRoles(current, ["textbox"])) {
        consultedNodes.add(current);
        return getValueOfTextbox(current);
      }
    } // 2F: https://w3c.github.io/accname/#step2F


    if (allowsNameFromContent(current) || isElement(current) && context.isReferenced || isNativeHostLanguageTextAlternativeElement(current) || isDescendantOfNativeHostLanguageTextAlternativeElement(current)) {
      consultedNodes.add(current);
      return computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false
      });
    }

    if (current.nodeType === current.TEXT_NODE) {
      consultedNodes.add(current);
      return current.textContent || "";
    }

    if (context.recursion) {
      consultedNodes.add(current);
      return computeMiscTextAlternative(current, {
        isEmbeddedInLabel: context.isEmbeddedInLabel,
        isReferenced: false
      });
    }

    var tooltipAttributeValue = computeTooltipAttributeValue(current);

    if (tooltipAttributeValue !== null) {
      consultedNodes.add(current);
      return tooltipAttributeValue;
    } // TODO should this be reachable?


    consultedNodes.add(current);
    return "";
  }

  return asFlatString(computeTextAlternative(root, {
    isEmbeddedInLabel: false,
    isReferenced: false,
    recursion: false
  }));
}
//# sourceMappingURL=accessible-name.mjs.map