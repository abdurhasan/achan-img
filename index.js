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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var redis = __webpack_require__(/*! redis */ \"redis\");\n\nvar client = redis.createClient(6379, '52.221.198.120');\nvar port = process.env.PORT || 3000;\n\nvar fastify = __webpack_require__(/*! fastify */ \"fastify\")({\n  logger: true\n});\n\nfastify.get('/', function (req, res) {\n  var _req$query = req.query,\n      image = _req$query.image,\n      keystore = _req$query.keystore,\n      expire = _req$query.expire;\n\n  if (!image || !keystore) {\n    return res.callNotFound();\n  }\n\n  var expired = expire ? expire : 600;\n  client.setex(keystore, expired, image);\n  res.send({\n    success: true,\n    url_image: \"http://\".concat(req.headers.host, \"/image/\").concat(keystore)\n  });\n});\nfastify.get('/image/:keystore', function (req, res) {\n  var keystore = req.params.keystore;\n  client.get(keystore, function (err, data) {\n    if (err) throw err;\n\n    if (data != null) {\n      var base64Data = data.replace(/^data:image\\/png;base64,/, \"\").replace(/ /g, \"+\");\n      var img = Buffer.from(base64Data, 'base64');\n      res.header('Content-Type', 'image/png');\n      res.send(img);\n    } else {\n      res.callNotFound();\n    }\n  });\n}); // Run the server!\n\nfastify.listen(port, function (err, address) {\n  if (err) throw err;\n  fastify.log.info(\"server listening on \".concat(address));\n});\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "fastify":
/*!**************************!*\
  !*** external "fastify" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fastify\");\n\n//# sourceURL=webpack:///external_%22fastify%22?");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redis\");\n\n//# sourceURL=webpack:///external_%22redis%22?");

/***/ })

/******/ });