webpackHotUpdate("cms",{

/***/ "./src/cms/Editor.js":
/*!***************************!*\
  !*** ./src/cms/Editor.js ***!
  \***************************/
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
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var wix_rich_content_editor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! wix-rich-content-editor */ "./node_modules/wix-rich-content-editor/dist/module.js");
/* harmony import */ var wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! wix-rich-content-editor-common */ "./node_modules/wix-rich-content-editor-common/dist/module.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-modal */ "./node_modules/react-modal/lib/index.js");
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _ModalsMap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ModalsMap */ "./src/cms/ModalsMap.js");
/* harmony import */ var _EditorPlugins__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./EditorPlugins */ "./src/cms/EditorPlugins.js");
/* harmony import */ var _emotion_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @emotion/core */ "./node_modules/@emotion/core/dist/core.browser.esm.js");








var _jsxFileName = "/Users/fdecampredon/workspaces/site-vanessa/src/cms/Editor.js";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function _createSuper(Derived) { return function () { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

/* eslint-disable react/prop-types */







var modalStyleDefaults = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
var anchorTarget = '_blank';

var Editor = /*#__PURE__*/function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_7__["default"])(Editor, _Component);

  var _super = _createSuper(Editor);

  function Editor(props, context) {
    var _this;

    _this = _Component.call(this, props, context) || this;

    _this.onChange = function (value) {
      _this.setState({
        editorState: value
      });

      console.log(value);
    };

    _this.helpers = {
      openModal: function openModal(data) {
        var modalStyles = data.modalStyles,
            modalProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_4__["default"])(data, ["modalStyles"]);

        _this.setState({
          showModal: true,
          modalProps: modalProps,
          modalStyles: modalStyles
        });
      },
      closeModal: function closeModal() {
        _this.setState({
          showModal: false,
          modalProps: null,
          modalStyles: null
        });
      }
    };
    var blocksFromHTML = Object(wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_10__["convertFromHTML"])(_this.props.value || ' ');
    var contentState = wix_rich_content_editor_common__WEBPACK_IMPORTED_MODULE_10__["ContentState"].createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
    _this.state = {
      showModal: false,
      modalProps: false,
      modalStyles: {},
      editorState: wix_rich_content_editor__WEBPACK_IMPORTED_MODULE_9__["EditorState"].createWithContent(contentState)
    };
    return _this;
  }

  var _proto = Editor.prototype;

  _proto.componentDidMount = function componentDidMount() {
    react_modal__WEBPACK_IMPORTED_MODULE_11___default.a.setAppElement('body');
  };

  _proto.render = function render() {
    var _this$props = this.props,
        forID = _this$props.forID,
        classNameWrapper = _this$props.classNameWrapper,
        setActiveStyle = _this$props.setActiveStyle,
        setInactiveStyle = _this$props.setInactiveStyle;
    var _this$state = this.state,
        modalStyles = _this$state.modalStyles,
        editorState = _this$state.editorState,
        modalProps = _this$state.modalProps;
    return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_14__["jsx"])("div", {
      className: "rich-text-editor " + classNameWrapper,
      style: {
        maxHeight: '80vh',
        minHeight: 100,
        paddingLeft: 60,
        overflow: 'auto'
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78,
        columnNumber: 7
      }
    }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_14__["jsx"])(wix_rich_content_editor__WEBPACK_IMPORTED_MODULE_9__["RichContentEditor"], {
      placeholder: "Content",
      helpers: this.helpers,
      plugins: _EditorPlugins__WEBPACK_IMPORTED_MODULE_13__["editorPlugins"] // config={this.pluginsConfig}
      ,
      editorKey: forID,
      onChange: this.onChange,
      editorState: editorState,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
      anchorTarget: anchorTarget,
      textToolbarType: "static",
      isMobime: false,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87,
        columnNumber: 9
      }
    }), Object(_emotion_core__WEBPACK_IMPORTED_MODULE_14__["jsx"])(react_modal__WEBPACK_IMPORTED_MODULE_11___default.a, {
      isOpen: this.state.showModal,
      contentLabel: "External Modal Example",
      style: modalStyles || modalStyleDefaults,
      role: "dialog",
      onRequestClose: this.helpers.closeModal,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 102,
        columnNumber: 9
      }
    }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_14__["jsx"])(wix_rich_content_editor__WEBPACK_IMPORTED_MODULE_9__["RichContentEditorModal"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({
      modalsMap: _ModalsMap__WEBPACK_IMPORTED_MODULE_12__["default"]
    }, modalProps, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 11
      }
    }))));
  };

  // @ts-ignore
  _proto.__reactstandin__regenerateByEval = function __reactstandin__regenerateByEval(key, code) {
    // @ts-ignore
    this[key] = eval(code);
  };

  return Editor;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

var _default = Editor;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(modalStyleDefaults, "modalStyleDefaults", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/Editor.js");
  reactHotLoader.register(anchorTarget, "anchorTarget", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/Editor.js");
  reactHotLoader.register(Editor, "Editor", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/Editor.js");
  reactHotLoader.register(_default, "default", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/Editor.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=cms.677c955526ef52a852ca.hot-update.js.map