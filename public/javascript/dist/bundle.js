/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/javascript/src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/javascript/src/listing.js":
/*!******************************************!*\
  !*** ./public/javascript/src/listing.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n/*\n    global $ cloudinary\n*/\n\nconst Listing = (function() {\n    function init() {\n        initializeUploadWidget();\n    }\n\n    function initializeUploadWidget() {\n        const uploadWidget = cloudinary.createUploadWidget({\n                uploadPreset: \"ttonn4eb\",\n                form: \"#listing-form\",\n                fieldName: 'imageData',\n                multiple: false,\n            },\n            (err, result) => {\n                if (err) {\n                    console.error(err);\n                    $('#upload-error').show();\n                }\n                if (result && result.event === 'success') {\n                    $('#upload-success').append('<p>' + result.info.original_filename + '.' + result.info.format + '</p>')\n                    $('#upload-success').show();\n                    $('#show-upload-widget').hide();\n                }\n\n            });\n        $('#show-upload-widget').on('click', () => uploadWidget.open());\n    }\n\n\n\n\n    return {\n        init\n    };\n})();\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Listing);\n\n\n//# sourceURL=webpack:///./public/javascript/src/listing.js?");

/***/ }),

/***/ "./public/javascript/src/main.js":
/*!***************************************!*\
  !*** ./public/javascript/src/main.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _listing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listing */ \"./public/javascript/src/listing.js\");\n'use scrict';\n/*global $ cloudinary*/\n\n\nconst Main = (function() {\n    function init() {\n        $(\"#logout\").on('click', logoutUser);\n        cloudinary.setCloudName(\"drcrdobkq\");\n        $('.success .close').on('click', function() {\n            $(this).hide();\n        });\n    }\n\n    function logoutUser() {\n        $(\"#main-loader\").addClass('active');\n        $.ajax('/users/logout', {\n            method: 'POST',\n            success: function(isSuccess) {\n                if (isSuccess) {\n                    window.location.href = '/';\n                }\n            },\n            error: function(err) {\n                console.error(err);\n            },\n            complete: function() {\n                $(\"#main-loader\").removeClass('active');\n            }\n\n        });\n    }\n\n\n\n\n    return {\n        init\n    };\n})();\n\n$(function() {\n    Main.init();\n    _listing__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n});\n\n\n//# sourceURL=webpack:///./public/javascript/src/main.js?");

/***/ })

/******/ });