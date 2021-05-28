"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWindowFromNode = getWindowFromNode;
exports.getDocument = getDocument;
exports.runWithRealTimers = runWithRealTimers;
exports.setTimeout = exports.setImmediate = exports.clearTimeout = void 0;
const globalObj = typeof window === 'undefined' ? global : window; // Currently this fn only supports jest timers, but it could support other test runners in the future.

function runWithRealTimers(callback) {
  const usingJestFakeTimers = globalObj.setTimeout && globalObj.setTimeout._isMockFunction && typeof jest !== 'undefined';

  if (usingJestFakeTimers) {
    jest.useRealTimers();
  }

  const callbackReturnValue = callback();

  if (usingJestFakeTimers) {
    jest.useFakeTimers();
  }

  return callbackReturnValue;
} // we only run our tests in node, and setImmediate is supported in node.
// istanbul ignore next


function setImmediatePolyfill(fn) {
  return globalObj.setTimeout(fn, 0);
}

function getTimeFunctions() {
  // istanbul ignore next
  return {
    clearTimeoutFn: globalObj.clearTimeout,
    setImmediateFn: globalObj.setImmediate || setImmediatePolyfill,
    setTimeoutFn: globalObj.setTimeout
  };
}

const {
  clearTimeoutFn,
  setImmediateFn,
  setTimeoutFn
} = runWithRealTimers(getTimeFunctions);
exports.setTimeout = setTimeoutFn;
exports.setImmediate = setImmediateFn;
exports.clearTimeout = clearTimeoutFn;

function getDocument() {
  /* istanbul ignore if */
  if (typeof window === 'undefined') {
    throw new Error('Could not find default container');
  }

  return window.document;
}

function getWindowFromNode(node) {
  // istanbul ignore next I'm not sure what could cause the final else so we'll leave it uncovered.
  if (node.defaultView) {
    // node is document
    return node.defaultView;
  } else if (node.ownerDocument && node.ownerDocument.defaultView) {
    // node is a DOM node
    return node.ownerDocument.defaultView;
  } else if (node.window) {
    // node is window
    return node.window;
  } else {
    // no idea...
    throw new Error(`Unable to find the "window" object for the given node. Please file an issue with the code that's causing you to see this error: https://github.com/testing-library/dom-testing-library/issues/new`);
  }
}