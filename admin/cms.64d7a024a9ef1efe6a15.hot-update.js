webpackHotUpdate("cms",{

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
/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ckeditor/ckeditor5-react */ "./node_modules/@ckeditor/ckeditor5-react/dist/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ckeditor_ckeditor5_build_balloon_block__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ckeditor/ckeditor5-build-balloon-block */ "./node_modules/@ckeditor/ckeditor5-build-balloon-block/build/ckeditor.js");
/* harmony import */ var _ckeditor_ckeditor5_build_balloon_block__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_build_balloon_block__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");






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




var editorConfig = {
  placeholder: 'Type the content here!',
  blockToolbar: ['heading', '|', 'bulletedList', 'numberedList', '|', 'indent', 'outdent', '|', // 'imageUpload',
  'blockQuote', 'insertTable', 'mediaEmbed', '|', 'undo', 'redo'],
  toolbar: {
    items: ['heading', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'indent', 'outdent', '|', 'blockQuote']
  },
  image: {
    toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  heading: {
    options: [{
      model: 'paragraph',
      title: 'Paragraph',
      class: 'ck-heading_paragraph'
    }, {
      model: 'heading2',
      view: 'h2',
      title: 'Heading 2',
      class: 'ck-heading_heading2'
    }, {
      model: 'heading3',
      view: 'h2',
      title: 'Heading 3',
      class: 'ck-heading_heading3'
    }, {
      model: 'heading4',
      view: 'h4',
      title: 'Heading 4',
      class: 'ck-heading_heading4'
    }]
  }
};

var CKEditorWidget = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_5__["default"])(CKEditorWidget, _React$Component);

  var _super = _createSuper(CKEditorWidget);

  function CKEditorWidget() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CKEditorWidget.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        forID = _this$props.forID,
        classNameWrapper = _this$props.classNameWrapper,
        setActiveStyle = _this$props.setActiveStyle,
        setInactiveStyle = _this$props.setInactiveStyle,
        value = _this$props.value,
        _onChange = _this$props.onChange;
    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__["jsx"])("div", {
      className: classNameWrapper,
      style: {
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: 200
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89,
        columnNumber: 7
      }
    }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_9__["jsx"])(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_7___default.a, {
      id: forID,
      editor: _ckeditor_ckeditor5_build_balloon_block__WEBPACK_IMPORTED_MODULE_8___default.a,
      data: value,
      config: editorConfig,
      onInit: function onInit(editor) {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor);
      },
      onChange: function onChange(event, editor) {
        var data = editor.getData();

        _onChange(data);

        console.log({
          event: event,
          editor: editor,
          data: data
        });
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
        lineNumber: 97,
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

  reactHotLoader.register(editorConfig, "editorConfig", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/CKEditorWidget.js");
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
//# sourceMappingURL=cms.64d7a024a9ef1efe6a15.hot-update.js.map