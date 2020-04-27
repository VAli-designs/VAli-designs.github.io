webpackHotUpdate("cms",{

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayLikeToArray; });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayWithoutHoles; });
/* harmony import */ var _arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _iterableToArray; });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _nonIterableSpread; });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _toConsumableArray; });
/* harmony import */ var _arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return Object(_arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || Object(_iterableToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || Object(_unsupportedIterableToArray__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || Object(_nonIterableSpread__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _unsupportedIterableToArray; });
/* harmony import */ var _arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ }),

/***/ "./src/cms/EditorPlugins.js":
/*!**********************************!*\
  !*** ./src/cms/EditorPlugins.js ***!
  \**********************************/
/*! exports provided: editorPlugins, config */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editorPlugins", function() { return editorPlugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var wix_rich_content_plugin_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wix-rich-content-plugin-link */ "./node_modules/wix-rich-content-plugin-link/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_link_preview__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wix-rich-content-plugin-link-preview */ "./node_modules/wix-rich-content-plugin-link-preview/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_line_spacing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wix-rich-content-plugin-line-spacing */ "./node_modules/wix-rich-content-plugin-line-spacing/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_emoji__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wix-rich-content-plugin-emoji */ "./node_modules/wix-rich-content-plugin-emoji/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wix-rich-content-plugin-image */ "./node_modules/wix-rich-content-plugin-image/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_undo_redo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! wix-rich-content-plugin-undo-redo */ "./node_modules/wix-rich-content-plugin-undo-redo/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! wix-rich-content-plugin-divider */ "./node_modules/wix-rich-content-plugin-divider/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_vertical_embed__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! wix-rich-content-plugin-vertical-embed */ "./node_modules/wix-rich-content-plugin-vertical-embed/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_mentions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! wix-rich-content-plugin-mentions */ "./node_modules/wix-rich-content-plugin-mentions/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! wix-rich-content-plugin-text-color */ "./node_modules/wix-rich-content-plugin-text-color/dist/module.js");


var _config;

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};










 // import { createVerticalEmbedPlugin } from 'wix-rich-content-plugin-vertical-embed';
// eslint-disable-next-line import/prefer-default-export

var editorPlugins = [wix_rich_content_plugin_link_preview__WEBPACK_IMPORTED_MODULE_2__["createLinkPreviewPlugin"], wix_rich_content_plugin_image__WEBPACK_IMPORTED_MODULE_5__["createImagePlugin"], wix_rich_content_plugin_divider__WEBPACK_IMPORTED_MODULE_7__["createDividerPlugin"], wix_rich_content_plugin_line_spacing__WEBPACK_IMPORTED_MODULE_3__["createLineSpacingPlugin"], wix_rich_content_plugin_link__WEBPACK_IMPORTED_MODULE_1__["createLinkPlugin"], wix_rich_content_plugin_mentions__WEBPACK_IMPORTED_MODULE_9__["createExternalMentionsPlugin"], wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_10__["createTextColorPlugin"], wix_rich_content_plugin_emoji__WEBPACK_IMPORTED_MODULE_4__["createEmojiPlugin"], wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_10__["createTextHighlightPlugin"], wix_rich_content_plugin_undo_redo__WEBPACK_IMPORTED_MODULE_6__["createUndoRedoPlugin"]];
var Twitter = wix_rich_content_plugin_link_preview__WEBPACK_IMPORTED_MODULE_2__["LinkPreviewProviders"].Twitter,
    YouTube = wix_rich_content_plugin_link_preview__WEBPACK_IMPORTED_MODULE_2__["LinkPreviewProviders"].YouTube;
var config = (_config = {}, _config[wix_rich_content_plugin_link_preview__WEBPACK_IMPORTED_MODULE_2__["LINK_PREVIEW_TYPE"]] = {
  enableEmbed: true,
  // [Twitter, YouTube]
  enableLinkPreview: true,
  // fetchData: mockFetchUrlPreviewData(),
  exposeEmbedButtons: [Twitter, YouTube]
}, _config[wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_10__["TEXT_HIGHLIGHT_TYPE"]] = {
  // toolbar: {
  //   icons: {
  //     InsertPluginButtonIcon: MyCustomIcon,
  //   },
  // },
  colorScheme: colorScheme,
  styleSelectionPredicate: styleSelectionPredicate,
  customStyleFn: customBackgroundStyleFn,
  onColorAdded: function onColorAdded(color) {
    return userColors = [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(userColors), [color]);
  },
  getUserColors: function getUserColors() {
    return userColors;
  }
}, _config[wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_10__["TEXT_COLOR_TYPE"]] = {
  // toolbar: {
  //   icons: {
  //     InsertPluginButtonIcon: MyCustomIcon,
  //   },
  // },
  colorScheme: colorScheme,
  styleSelectionPredicate: styleSelectionPredicate,
  customStyleFn: customForegroundStyleFn,
  onColorAdded: function onColorAdded(color) {
    return userColors = [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(userColors), [color]);
  },
  getUserColors: function getUserColors() {
    return userColors;
  }
}, _config);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(editorPlugins, "editorPlugins", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
  reactHotLoader.register(Twitter, "Twitter", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
  reactHotLoader.register(YouTube, "YouTube", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
  reactHotLoader.register(config, "config", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=cms.a0ee802f3b9bf1702d57.hot-update.js.map