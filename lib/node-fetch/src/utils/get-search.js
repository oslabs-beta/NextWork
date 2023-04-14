"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearch = void 0;
var getSearch = function getSearch(parsedURL) {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  var lastOffset = parsedURL.href.length - 1;
  var hash = parsedURL.hash || (parsedURL.href[lastOffset] === '#' ? '#' : '');
  return parsedURL.href[lastOffset - hash.length] === '?' ? '?' : '';
};
exports.getSearch = getSearch;