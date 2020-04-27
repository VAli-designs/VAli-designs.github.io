webpackHotUpdate("cms",{

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
/* harmony import */ var _textColorStyleFn__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./textColorStyleFn */ "./src/cms/textColorStyleFn.js");


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
  colorScheme: _textColorStyleFn__WEBPACK_IMPORTED_MODULE_11__["colorScheme"],
  styleSelectionPredicate: _textColorStyleFn__WEBPACK_IMPORTED_MODULE_11__["styleSelectionPredicate"],
  customStyleFn: _textColorStyleFn__WEBPACK_IMPORTED_MODULE_11__["customBackgroundStyleFn"],
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
  colorScheme: _textColorStyleFn__WEBPACK_IMPORTED_MODULE_11__["colorScheme"],
  styleSelectionPredicate: _textColorStyleFn__WEBPACK_IMPORTED_MODULE_11__["styleSelectionPredicate"],
  customStyleFn: _textColorStyleFn__WEBPACK_IMPORTED_MODULE_11__["customForegroundStyleFn"],
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

/***/ }),

/***/ "./src/cms/textColorStyleFn.js":
/*!*************************************!*\
  !*** ./src/cms/textColorStyleFn.js ***!
  \*************************************/
/*! exports provided: colorScheme, viewerCustomForegroundStyleFn, customForegroundStyleFn, viewerCustomBackgroundStyleFn, customBackgroundStyleFn, styleSelectionPredicate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorScheme", function() { return colorScheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewerCustomForegroundStyleFn", function() { return viewerCustomForegroundStyleFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customForegroundStyleFn", function() { return customForegroundStyleFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewerCustomBackgroundStyleFn", function() { return viewerCustomBackgroundStyleFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "customBackgroundStyleFn", function() { return customBackgroundStyleFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleSelectionPredicate", function() { return styleSelectionPredicate; });
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.object.assign */ "./node_modules/gatsby/node_modules/core-js/modules/es6.object.assign.js");
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var wix_rich_content_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wix-rich-content-common */ "./node_modules/wix-rich-content-common/dist/module.js");


(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


var colorScheme = {
  color1: {
    color: '#fff',
    index: 0
  },
  color2: {
    color: '#303030',
    index: 1
  },
  color3: {
    color: '#bfad80',
    index: 2
  },
  color4: {
    color: '#bf695c',
    index: 3
  },
  color5: {
    color: '#f7f7f7',
    index: 4
  },
  color6: {
    color: '#f7f7f7',
    index: 5
  }
};
var viewerCustomForegroundStyleFn = function viewerCustomForegroundStyleFn(style) {
  var colorRule = {};

  if (colorScheme[style] && Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_1__["isHexColor"])(colorScheme[style].color)) {
    colorRule = {
      color: colorScheme[style].color
    };
  } else if (Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_1__["isHexColor"])(style)) {
    colorRule = {
      color: style
    };
  }

  return colorRule;
};
var customForegroundStyleFn = function customForegroundStyleFn(styles) {
  return styles.toArray().reduce(function (cssStyle, style) {
    return Object.assign({}, cssStyle, {}, viewerCustomForegroundStyleFn(style));
  }, {});
};
var viewerCustomBackgroundStyleFn = function viewerCustomBackgroundStyleFn(style) {
  var colorRule = {};

  if (colorScheme[style] && Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_1__["isHexColor"])(colorScheme[style].color)) {
    colorRule = {
      backgroundColor: colorScheme[style].color
    };
  } else if (Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_1__["isHexColor"])(style)) {
    colorRule = {
      backgroundColor: style
    };
  }

  return colorRule;
};
var customBackgroundStyleFn = function customBackgroundStyleFn(styles) {
  return styles.toArray().reduce(function (cssStyle, style) {
    return Object.assign({}, cssStyle, {}, viewerCustomBackgroundStyleFn(style));
  }, {});
};
var styleSelectionPredicate = function styleSelectionPredicate(style) {
  return colorScheme[style] && Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_1__["isHexColor"])(colorScheme[style].color) || Object(wix_rich_content_common__WEBPACK_IMPORTED_MODULE_1__["isHexColor"])(style);
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(colorScheme, "colorScheme", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/textColorStyleFn.js");
  reactHotLoader.register(viewerCustomForegroundStyleFn, "viewerCustomForegroundStyleFn", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/textColorStyleFn.js");
  reactHotLoader.register(customForegroundStyleFn, "customForegroundStyleFn", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/textColorStyleFn.js");
  reactHotLoader.register(viewerCustomBackgroundStyleFn, "viewerCustomBackgroundStyleFn", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/textColorStyleFn.js");
  reactHotLoader.register(customBackgroundStyleFn, "customBackgroundStyleFn", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/textColorStyleFn.js");
  reactHotLoader.register(styleSelectionPredicate, "styleSelectionPredicate", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/textColorStyleFn.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=cms.e2a7e73f07d69cfc6e2c.hot-update.js.map