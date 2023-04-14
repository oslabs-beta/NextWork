"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRedirect = void 0;
var redirectStatus = new Set([301, 302, 303, 307, 308]);

/**
 * Redirect code matching
 *
 * @param {number} code - Status code
 * @return {boolean}
 */
var isRedirect = function isRedirect(code) {
  return redirectStatus.has(code);
};
exports.isRedirect = isRedirect;