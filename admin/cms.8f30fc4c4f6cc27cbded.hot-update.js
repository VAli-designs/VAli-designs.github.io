webpackHotUpdate("cms",{

/***/ "./src/cms/index.js":
/*!**************************!*\
  !*** ./src/cms/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var netlify_cms_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! netlify-cms-app */ "netlify-cms-app");
/* harmony import */ var netlify_cms_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(netlify_cms_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CKEditorWidget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CKEditorWidget */ "./src/cms/CKEditorWidget.js");
/* harmony import */ var _style_loader_css_loader_editor_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! style-loader!css-loader!./editor.css */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js!./src/cms/editor.css");
/* harmony import */ var _style_loader_css_loader_editor_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_css_loader_editor_css__WEBPACK_IMPORTED_MODULE_2__);
var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};


 // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved


netlify_cms_app__WEBPACK_IMPORTED_MODULE_0___default.a.registerWidget('richtext', _CKEditorWidget__WEBPACK_IMPORTED_MODULE_1__["default"]);
netlify_cms_app__WEBPACK_IMPORTED_MODULE_0___default.a.registerEventListener({
  name: 'postPublish',
  handler: function handler(_ref) {
    var author = _ref.author,
        entry = _ref.entry;
    return console.log(JSON.stringify({
      author: author,
      data: entry.get('data')
    }));
  }
});

/***/ })

})
//# sourceMappingURL=cms.8f30fc4c4f6cc27cbded.hot-update.js.map