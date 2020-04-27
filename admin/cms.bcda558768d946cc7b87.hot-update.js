webpackHotUpdate("cms",{

/***/ "./node_modules/gatsby/node_modules/core-js/modules/_add-to-unscopables.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ "./node_modules/gatsby/node_modules/core-js/modules/_wks.js")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ "./node_modules/gatsby/node_modules/core-js/modules/_hide.js")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "./node_modules/gatsby/node_modules/core-js/modules/_iter-create.js":
/*!**************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/_iter-create.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/gatsby/node_modules/core-js/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/gatsby/node_modules/core-js/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/gatsby/node_modules/core-js/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/gatsby/node_modules/core-js/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/gatsby/node_modules/core-js/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/gatsby/node_modules/core-js/modules/_iter-define.js":
/*!**************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/_iter-define.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/gatsby/node_modules/core-js/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/gatsby/node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/gatsby/node_modules/core-js/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/gatsby/node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/gatsby/node_modules/core-js/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/gatsby/node_modules/core-js/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/gatsby/node_modules/core-js/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/gatsby/node_modules/core-js/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/gatsby/node_modules/core-js/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/gatsby/node_modules/core-js/modules/_iter-step.js":
/*!************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/_iter-step.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/gatsby/node_modules/core-js/modules/_iterators.js":
/*!************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/_iterators.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/gatsby/node_modules/core-js/modules/_object-gpo.js":
/*!*************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/_object-gpo.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/gatsby/node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/gatsby/node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/gatsby/node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/gatsby/node_modules/core-js/modules/_object-sap.js":
/*!*************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/_object-sap.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "./node_modules/gatsby/node_modules/core-js/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/gatsby/node_modules/core-js/modules/_core.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/gatsby/node_modules/core-js/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "./node_modules/gatsby/node_modules/core-js/modules/_set-to-string-tag.js":
/*!********************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/_set-to-string-tag.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/gatsby/node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/gatsby/node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/gatsby/node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/gatsby/node_modules/core-js/modules/es6.array.iterator.js":
/*!********************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/es6.array.iterator.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/gatsby/node_modules/core-js/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/gatsby/node_modules/core-js/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/gatsby/node_modules/core-js/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/gatsby/node_modules/core-js/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/gatsby/node_modules/core-js/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/gatsby/node_modules/core-js/modules/es6.object.keys.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/es6.object.keys.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/gatsby/node_modules/core-js/modules/_to-object.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/gatsby/node_modules/core-js/modules/_object-keys.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/gatsby/node_modules/core-js/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/gatsby/node_modules/core-js/modules/web.dom.iterable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/gatsby/node_modules/core-js/modules/web.dom.iterable.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ "./node_modules/gatsby/node_modules/core-js/modules/es6.array.iterator.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/gatsby/node_modules/core-js/modules/_object-keys.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/gatsby/node_modules/core-js/modules/_redefine.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/gatsby/node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/gatsby/node_modules/core-js/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/gatsby/node_modules/core-js/modules/_iterators.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/gatsby/node_modules/core-js/modules/_wks.js");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

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
/* harmony import */ var _EditorPlugins__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./EditorPlugins */ "./src/cms/EditorPlugins.js");
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
var relValue = 'noopener';
var shouldMultiSelectImages = false;

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
    this.setEditorToolbars();
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
        paddingLeft: 60,
        overflow: 'auto'
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81,
        columnNumber: 7
      }
    }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_14__["jsx"])(wix_rich_content_editor__WEBPACK_IMPORTED_MODULE_9__["RichContentEditor"], {
      placeholder: "Content",
      helpers: this.helpers // plugins={this.plugins}
      // // config={Plugins.getConfig(additionalConfig)}
      // config={this.pluginsConfig}
      ,
      editorKey: forID,
      onChange: this.onChange,
      editorState: editorState,
      onFocus: setActiveStyle,
      onBlur: setInactiveStyle,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85,
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
        lineNumber: 98,
        columnNumber: 9
      }
    }, Object(_emotion_core__WEBPACK_IMPORTED_MODULE_14__["jsx"])(wix_rich_content_editor__WEBPACK_IMPORTED_MODULE_9__["RichContentEditorModal"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({
      modalsMap: _ModalsMap__WEBPACK_IMPORTED_MODULE_12__["default"]
    }, modalProps, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 105,
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
  reactHotLoader.register(relValue, "relValue", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/Editor.js");
  reactHotLoader.register(shouldMultiSelectImages, "shouldMultiSelectImages", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/Editor.js");
  reactHotLoader.register(Editor, "Editor", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/Editor.js");
  reactHotLoader.register(_default, "default", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/Editor.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/cms/EditorPlugins.js":
/*!**********************************!*\
  !*** ./src/cms/EditorPlugins.js ***!
  \**********************************/
/*! exports provided: editorPluginsPartialPreset, editorPluginsEmbedsPreset, editorPlugins, editorPluginsMap, getConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editorPluginsPartialPreset", function() { return editorPluginsPartialPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editorPluginsEmbedsPreset", function() { return editorPluginsEmbedsPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editorPlugins", function() { return editorPlugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editorPluginsMap", function() { return editorPluginsMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es6.object.assign */ "./node_modules/gatsby/node_modules/core-js/modules/es6.object.assign.js");
/* harmony import */ var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom.iterable */ "./node_modules/gatsby/node_modules/core-js/modules/web.dom.iterable.js");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es6.array.iterator */ "./node_modules/gatsby/node_modules/core-js/modules/es6.array.iterator.js");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es6.object.to-string */ "./node_modules/gatsby/node_modules/core-js/modules/es6.object.to-string.js");
/* harmony import */ var core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_to_string__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ "./node_modules/gatsby/node_modules/core-js/modules/es6.object.keys.js");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var wix_rich_content_plugin_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! wix-rich-content-plugin-image */ "./node_modules/wix-rich-content-plugin-image/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_line_spacing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! wix-rich-content-plugin-line-spacing */ "./node_modules/wix-rich-content-plugin-line-spacing/dist/module.js");
/* harmony import */ var wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! wix-rich-content-plugin-text-color */ "./node_modules/wix-rich-content-plugin-text-color/dist/module.js");






(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};



 // import { createVerticalEmbedPlugin } from 'wix-rich-content-plugin-vertical-embed';

var editorPluginsPartialPreset = [wix_rich_content_plugin_image__WEBPACK_IMPORTED_MODULE_5__["createImagePlugin"], // createDividerPlugin,
wix_rich_content_plugin_line_spacing__WEBPACK_IMPORTED_MODULE_6__["createLineSpacingPlugin"], // createLinkPlugin,
// createHashtagPlugin,
// createExternalMentionsPlugin,
wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_7__["createTextColorPlugin"], // createEmojiPlugin,
wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_7__["createTextHighlightPlugin"] // createUndoRedoPlugin,
];
var editorPluginsEmbedsPreset = [// createLinkPlugin,
  // createLinkPreviewPlugin,
  // createVerticalEmbedPlugin,
];
var editorPlugins = [].concat(editorPluginsPartialPreset);
var editorPluginsMap = {
  image: wix_rich_content_plugin_image__WEBPACK_IMPORTED_MODULE_5__["createImagePlugin"],
  // divider: createDividerPlugin,
  spacing: wix_rich_content_plugin_line_spacing__WEBPACK_IMPORTED_MODULE_6__["createLineSpacingPlugin"],
  // link: createLinkPlugin,
  // linkPreview: createLinkPreviewPlugin,
  // hashtag: createHashtagPlugin,
  // mentions: createExternalMentionsPlugin,
  textColor: wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_7__["createTextColorPlugin"],
  // emoji: createEmojiPlugin,
  highlight: wix_rich_content_plugin_text_color__WEBPACK_IMPORTED_MODULE_7__["createTextHighlightPlugin"],
  // undoRedo: createUndoRedoPlugin,
  // verticalEmbed: createVerticalEmbedPlugin,
  partialPreset: editorPluginsPartialPreset,
  embedsPreset: editorPluginsEmbedsPreset,
  all: editorPlugins
}; // const buttonDefaultPalette = [
//   '#FEFDFD',
//   '#D5D4D4',
//   '#ABCAFF',
//   '#81B0FF',
//   '#0261FF',
//   '#0141AA',
// ];
// const userButtonTextColors = [...buttonDefaultPalette];
// const userButtonBackgroundColors = [...buttonDefaultPalette];
// const userButtonBorderColors = [...buttonDefaultPalette];

var getConfig = function getConfig(additionalConfig) {
  if (additionalConfig === void 0) {
    additionalConfig = {};
  }

  var _config = {};
  Object.keys(additionalConfig).forEach(function (key) {
    _config[key] = Object.assign({}, _config[key] || {}, {}, additionalConfig[key] || {});
  });
  return _config;
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(editorPluginsPartialPreset, "editorPluginsPartialPreset", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
  reactHotLoader.register(editorPluginsEmbedsPreset, "editorPluginsEmbedsPreset", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
  reactHotLoader.register(editorPlugins, "editorPlugins", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
  reactHotLoader.register(editorPluginsMap, "editorPluginsMap", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
  reactHotLoader.register(getConfig, "getConfig", "/Users/fdecampredon/workspaces/site-vanessa/src/cms/EditorPlugins.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=cms.bcda558768d946cc7b87.hot-update.js.map