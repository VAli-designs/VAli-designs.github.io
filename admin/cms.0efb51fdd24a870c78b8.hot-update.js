webpackHotUpdate("cms",{

/***/ "./src/cms/EditorPlugins.js":
/*!**********************************!*\
  !*** ./src/cms/EditorPlugins.js ***!
  \**********************************/
/*! exports provided: editorPluginsPartialPreset, editorPluginsEmbedsPreset, editorPlugins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editorPluginsPartialPreset", function() { return editorPluginsPartialPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editorPluginsEmbedsPreset", function() { return editorPluginsEmbedsPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editorPlugins", function() { return editorPlugins; });
/* harmony import */ var wix_rich_content_plugin_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wix-rich-content-plugin-image */ "./node_modules/wix-rich-content-plugin-image/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_line_spacing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wix-rich-content-plugin-line-spacing */ "./node_modules/wix-rich-content-plugin-line-spacing/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wix-rich-content-plugin-text-color */ "./node_modules/wix-rich-content-plugin-text-color/dist/module.js");
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



 // import { createVerticalEmbedPlugin } from 'wix-rich-content-plugin-vertical-embed';

var editorPluginsPartialPreset = [wix_rich_content_plugin_image__WEBPACK_IMPORTED_MODULE_0__["createImagePlugin"], // createDividerPlugin,
wix_rich_content_plugin_line_spacing__WEBPACK_IMPORTED_MODULE_1__["createLineSpacingPlugin"], // createLinkPlugin,
// createHashtagPlugin,
// createExternalMentionsPlugin,
wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_2__["createTextColorPlugin"], // createEmojiPlugin,
wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_2__["createTextHighlightPlugin"] // createUndoRedoPlugin,
];
var editorPluginsEmbedsPreset = [// createLinkPlugin,
  // createLinkPreviewPlugin,
  // createVerticalEmbedPlugin,
];
var editorPlugins = [].concat(editorPluginsPartialPreset);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(editorPluginsPartialPreset, "editorPluginsPartialPreset", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
  reactHotLoader.register(editorPluginsEmbedsPreset, "editorPluginsEmbedsPreset", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
  reactHotLoader.register(editorPlugins, "editorPlugins", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=cms.0efb51fdd24a870c78b8.hot-update.js.map