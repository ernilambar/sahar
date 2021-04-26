/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/goto-top.js":
/*!****************************!*\
  !*** ./src/js/goto-top.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");

document.addEventListener("DOMContentLoaded", function () {
  var scrollUp = document.getElementById('scrollup');

  if (scrollUp) {
    var scrollHandler = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.debounce)(function () {
      var scrollPosition = window.pageYOffset | document.body.scrollTop;

      if (scrollPosition > 300) {
        scrollUp.classList.add('scroll-on');
      } else {
        scrollUp.classList.remove('scroll-on');
      }
    }, 250);
    window.addEventListener('scroll', scrollHandler);
    scrollUp.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

/***/ }),

/***/ "./src/js/navigation.js":
/*!******************************!*\
  !*** ./src/js/navigation.js ***!
  \******************************/
/***/ (function() {

/* global saharScreenReaderText */

/**
 * Theme functions file.
 */
(function ($) {
  var body, masthead, menuToggle, siteNavigation, siteHeaderMenu, resizeTimer;

  function initMainNavigation(container) {
    // Add dropdown toggle that displays child menu items.
    var dropdownToggle = $('<button />', {
      'class': 'dropdown-toggle',
      'aria-expanded': false
    }).append($('<span />', {
      'class': 'screen-reader-text',
      text: saharScreenReaderText.expand
    }));
    container.find('.menu-item-has-children > a').after(dropdownToggle); // Toggle buttons and submenu items with active children menu items.

    container.find('.current-menu-ancestor > button').addClass('toggled-on');
    container.find('.current-menu-ancestor > .sub-menu').addClass('toggled-on'); // Add menu items with submenus to aria-haspopup="true".

    container.find('.menu-item-has-children').attr('aria-haspopup', 'true');
    container.find('.dropdown-toggle').on('click', function (e) {
      var _this = $(this),
          screenReaderSpan = _this.find('.screen-reader-text');

      e.preventDefault();

      _this.toggleClass('toggled-on');

      _this.siblings('a').toggleClass('item-open');

      _this.next('.children, .sub-menu').toggleClass('toggled-on'); // jscs:disable


      _this.attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false'); // jscs:enable


      screenReaderSpan.text(screenReaderSpan.text() === saharScreenReaderText.expand ? saharScreenReaderText.collapse : saharScreenReaderText.expand);
    });
  }

  initMainNavigation($('.main-navigation'));
  masthead = $('#masthead');
  menuToggle = masthead.find('#menu-toggle');
  siteHeaderMenu = masthead.find('#site-header-menu');
  siteNavigation = masthead.find('#site-navigation'); // Enable menuToggle.

  (function () {
    // Return early if menuToggle is missing.
    if (!menuToggle.length) {
      return;
    } // Add an initial values for the attribute.


    menuToggle.add(siteNavigation).attr('aria-expanded', 'false');
    menuToggle.on('click.sahar', function () {
      $(this).add(siteHeaderMenu).toggleClass('toggled-on'); // jscs:disable

      $(this).add(siteNavigation).attr('aria-expanded', $(this).add(siteNavigation).attr('aria-expanded') === 'false' ? 'true' : 'false'); // jscs:enable
    });
  })(); // Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.


  (function () {
    if (!siteNavigation.length || !siteNavigation.children().length) {
      return;
    } // Toggle `focus` class to allow submenu access on tablets.


    function toggleFocusClassTouchScreen() {
      if (window.innerWidth >= 910) {
        $(document.body).on('touchstart.sahar', function (e) {
          if (!$(e.target).closest('.main-navigation li').length) {
            $('.main-navigation li').removeClass('focus');
          }
        });
        siteNavigation.find('.menu-item-has-children > a').on('touchstart.sahar', function (e) {
          var el = $(this).parent('li');

          if (!el.hasClass('focus')) {
            e.preventDefault();
            el.toggleClass('focus');
            el.siblings('.focus').removeClass('focus');
          }
        });
      } else {
        siteNavigation.find('.menu-item-has-children > a').unbind('touchstart.sahar');
      }
    }

    if ('ontouchstart' in window) {
      $(window).on('resize.sahar', toggleFocusClassTouchScreen);
      toggleFocusClassTouchScreen();
    }

    siteNavigation.find('a').on('focus.sahar blur.sahar', function () {
      $(this).parents('.menu-item').toggleClass('focus');
    });
  })(); // Add the default ARIA attributes for the menu toggle and the navigations.


  function onResizeARIA() {
    if (window.innerWidth < 910) {
      if (menuToggle.hasClass('toggled-on')) {
        menuToggle.attr('aria-expanded', 'true');
      } else {
        menuToggle.attr('aria-expanded', 'false');
      }

      if (siteHeaderMenu.hasClass('toggled-on')) {
        siteNavigation.attr('aria-expanded', 'true');
      } else {
        siteNavigation.attr('aria-expanded', 'false');
      }

      menuToggle.attr('aria-controls', 'site-navigation');
      $('#site-header-menu').on('focusout', function () {
        var $elem = $(this); // let the browser set focus on the newly clicked elem before check

        setTimeout(function () {
          if (!$elem.find(':focus').length) {
            $('#menu-toggle').trigger('click');
          }
        }, 0);
      });
    } else {
      menuToggle.removeAttr('aria-expanded');
      siteNavigation.removeAttr('aria-expanded');
      menuToggle.removeAttr('aria-controls');
    }
  }
})(jQuery);

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "throttle": function() { return /* binding */ throttle; },
/* harmony export */   "debounce": function() { return /* binding */ debounce; }
/* harmony export */ });
var throttle = function throttle(func, limit) {
  var inThrottle;
  return function () {
    var args = arguments;
    var context = this;

    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function () {
        return inThrottle = false;
      }, limit);
    }
  };
};

var debounce = function debounce(func, delay) {
  var inDebounce;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(function () {
      return func.apply(context, args);
    }, delay);
  };
};



/***/ }),

/***/ "./src/scss/frontend.scss":
/*!********************************!*\
  !*** ./src/scss/frontend.scss ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/img/icons.svg":
/*!***************************!*\
  !*** ./src/img/icons.svg ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "images/icons.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "./";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_frontend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/frontend.scss */ "./src/scss/frontend.scss");
/* harmony import */ var _img_icons_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./img/icons.svg */ "./src/img/icons.svg");
/* harmony import */ var _js_navigation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/navigation.js */ "./src/js/navigation.js");
/* harmony import */ var _js_navigation_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_navigation_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_goto_top_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/goto-top.js */ "./src/js/goto-top.js");




}();
/******/ })()
;
//# sourceMappingURL=frontend-bundle.js.map