webpackHotUpdate("cms",{

/***/ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js":
false,

/***/ "./src/cms/CKEditorWidget.js":
/*!***********************************!*\
  !*** ./src/cms/CKEditorWidget.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.regexp.to-string */ "./node_modules/gatsby/node_modules/core-js/modules/es6.regexp.to-string.js");
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es6.object.to-string */ "./node_modules/gatsby/node_modules/core-js/modules/es6.object.to-string.js");
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_reflect_construct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.reflect.construct */ "./node_modules/gatsby/node_modules/core-js/modules/es6.reflect.construct.js");
/* harmony import */ var core_js_modules_es6_reflect_construct__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_reflect_construct__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ckeditor/ckeditor5-react */ "./node_modules/@ckeditor/ckeditor5-react/dist/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! immutable */ "./node_modules/immutable/dist/immutable.js");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ckeditor_ckeditor5_build_balloon_block__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ckeditor/ckeditor5-build-balloon-block */ "./node_modules/@ckeditor/ckeditor5-build-balloon-block/build/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_build_balloon_block__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_build_balloon_block__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");






var _jsxFileName = "/Users/fdecampredon/workspaces/site-vanessa/src/cms/CKEditorWidget.js";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { return function () { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

/* eslint-disable react/prefer-stateless-function */

/* eslint-disable react/prop-types */
// eslint-disable-next-line max-classes-per-file


 // eslint-disable-next-line import/no-extraneous-dependencies





var CKEditorWidget = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_5__["default"])(CKEditorWidget, _React$Component);

  var _super = _createSuper(CKEditorWidget);

  function CKEditorWidget() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.currentUid = null;
    return _this;
  }

  var _proto = CKEditorWidget.prototype;

  _proto.openMediaLibrary = function openMediaLibrary() {
    var _this$props = this.props,
        field = _this$props.field,
        onOpenMediaLibrary = _this$props.onOpenMediaLibrary,
        value = _this$props.value;
    this.currentUid = Object(uuid__WEBPACK_IMPORTED_MODULE_7__["v4"])();
    /**
     * `options` hash as a general field property is deprecated, only used
     * when external media libraries were first introduced. Not to be
     * confused with `options` for the select widget, which serves a different
     * purpose.
     */

    return onOpenMediaLibrary({
      controlID: this.currentUid,
      forImage: false,
      privateUpload: field.get('private'),
      value: value,
      allowMultiple: false,
      config: field.get('media_library', Object(immutable__WEBPACK_IMPORTED_MODULE_9__["Map"])()).get('config'),
      field: field
    });
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var _this$props2 = this.props,
        mediaPaths = _this$props2.mediaPaths,
        getAsset = _this$props2.getAsset;
    var mediaPath = this.currentUid && mediaPaths.get(this.currentUid);

    if (mediaPath) {
      this.currentUid = null;
      this.editor.model.change(function (writer) {
        var imageElement = writer.createElement('image', {
          src: mediaPath,
          // `${getAsset(mediaPath).url}`,
          dataSrc: mediaPath
        }); // Insert the image in the current selection location.

        _this2.editor.model.insertContent(imageElement, _this2.editor.model.document.selection);
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props3 = this.props,
        forID = _this$props3.forID,
        classNameWrapper = _this$props3.classNameWrapper,
        setActiveStyle = _this$props3.setActiveStyle,
        setInactiveStyle = _this$props3.setInactiveStyle,
        value = _this$props3.value,
        _onChange = _this$props3.onChange;
    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_11__["jsx"])("div", {
      className: classNameWrapper,
      style: {
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: 200
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 7
      }
    }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_11__["jsx"])(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_8___default.a, {
      id: forID,
      editor: _ckeditor_ckeditor5_build_balloon_block__WEBPACK_IMPORTED_MODULE_10___default.a,
      onInit: function onInit(editor) {
        _this3.editor = editor;
      },
      config: {
        insertImage: {
          openMediaLibrary: function openMediaLibrary() {
            _this3.openMediaLibrary();
          }
        }
      },
      data: value,
      onChange: function onChange(event, editor) {
        var data = editor.getData();

        _onChange(data);
      },
      onBlur: function onBlur() {
        return setInactiveStyle();
      },
      onFocus: function onFocus() {
        return setActiveStyle();
      },
      style: {
        outline: 'none'
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 9
      }
    }));
  };

  // @ts-ignore
  _proto.__reactstandin__regenerateByEval = function __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  };

  return CKEditorWidget;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

var _default = CKEditorWidget;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CKEditorWidget, "CKEditorWidget", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/CKEditorWidget.js");
  reactHotLoader.register(_default, "default", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/CKEditorWidget.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=cms.2ac037ac7b83788d98b9.hot-update.js.map