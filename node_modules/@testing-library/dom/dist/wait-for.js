"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitFor = waitForWrapper;
exports.wait = wait;

var _helpers = require("./helpers");

var _config = require("./config");

// This is so the stack trace the developer sees is one that's
// closer to their code (because async stack traces are hard to follow).
function copyStackTrace(target, source) {
  target.stack = source.stack.replace(source.message, target.message);
}

function waitFor(callback, {
  container = (0, _helpers.getDocument)(),
  timeout = (0, _config.getConfig)().asyncUtilTimeout,
  showOriginalStackTrace = (0, _config.getConfig)().showOriginalStackTrace,
  stackTraceError,
  interval = 50,
  mutationObserverOptions = {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true
  }
}) {
  if (typeof callback !== 'function') {
    throw new TypeError('Received `callback` arg must be a function');
  }

  if (interval < 1) interval = 1;
  return new Promise((resolve, reject) => {
    let lastError;
    const overallTimeoutTimer = (0, _helpers.setTimeout)(onTimeout, timeout);
    const intervalId = setInterval(checkCallback, interval);
    const {
      MutationObserver
    } = (0, _helpers.getWindowFromNode)(container);
    const observer = new MutationObserver(checkCallback);
    (0, _helpers.runWithRealTimers)(() => observer.observe(container, mutationObserverOptions));
    checkCallback();

    function onDone(error, result) {
      (0, _helpers.clearTimeout)(overallTimeoutTimer);
      clearInterval(intervalId);
      (0, _helpers.setImmediate)(() => observer.disconnect());

      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }

    function checkCallback() {
      try {
        onDone(null, callback()); // If `callback` throws, wait for the next mutation or timeout.
      } catch (error) {
        // Save the callback error to reject the promise with it.
        lastError = error;
      }
    }

    function onTimeout() {
      let error;

      if (lastError) {
        error = lastError;

        if (!showOriginalStackTrace && error.name === 'TestingLibraryElementError') {
          copyStackTrace(error, stackTraceError);
        }
      } else {
        error = new Error('Timed out in waitFor.');

        if (!showOriginalStackTrace) {
          copyStackTrace(error, stackTraceError);
        }
      }

      onDone(error, null);
    }
  });
}

function waitForWrapper(callback, options) {
  // create the error here so its stack trace is as close to the
  // calling code as possible
  const stackTraceError = new Error('STACK_TRACE_MESSAGE');
  return (0, _config.getConfig)().asyncWrapper(() => waitFor(callback, {
    stackTraceError,
    ...options
  }));
}

let hasWarned = false; // deprecated... TODO: remove this method. We renamed this to `waitFor` so the
// code people write reads more clearly.

function wait(...args) {
  // istanbul ignore next
  const [first = () => {}, ...rest] = args;

  if (!hasWarned) {
    hasWarned = true;
    console.warn(`\`wait\` has been deprecated and replaced by \`waitFor\` instead. In most cases you should be able to find/replace \`wait\` with \`waitFor\`. Learn more: https://testing-library.com/docs/dom-testing-library/api-async#waitfor.`);
  }

  return waitForWrapper(first, ...rest);
}