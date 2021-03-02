/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/_resources/js/components/foreach-shim.js":
/*!******************************************************!*\
  !*** ./src/_resources/js/components/foreach-shim.js ***!
  \******************************************************/
/***/ (() => {

(function () {
  'use strict';

  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;

      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
})();

/***/ }),

/***/ "./src/_resources/js/main.js":
/*!***********************************!*\
  !*** ./src/_resources/js/main.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! smoothscroll-polyfill */ "./node_modules/smoothscroll-polyfill/dist/smoothscroll.js");
/* harmony import */ var smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0__);
__webpack_require__(/*! intersection-observer */ "./node_modules/intersection-observer/intersection-observer.js");



__webpack_require__(/*! ./components/foreach-shim */ "./src/_resources/js/components/foreach-shim.js"); // kick off the polyfill!


smoothscroll_polyfill__WEBPACK_IMPORTED_MODULE_0___default().polyfill();
/*
** Intersection Observer on header
*/

var headerElement, navigationElement;
document.addEventListener('DOMContentLoaded', function () {
  headerElement = document.querySelector('.home-hero');

  if (headerElement) {
    headerElement.style.height = headerElement.offsetHeight + 'px';
  }

  navigationElement = document.querySelector('main .primary-navigation');

  if (headerElement && 'IntersectionObserver' in window) {
    createObserver();
  } else {
    navigationElement.classList.add('with-background');
  }
}, false);

function createObserver() {
  var observer = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: '0px',
    threshold: [0.15, 1]
  });
  observer.observe(headerElement);
}

function handleIntersect(entries) {
  entries.forEach(function (entry) {
    console.log(entry.intersectionRatio);

    if (entry.intersectionRatio < 0.5) {
      navigationElement.classList.add('with-background');
    } else {
      navigationElement.classList.remove('with-background');
    }
  });
} // get all slides
// get all tabs
// assume mapping between two; i.e. slide[i] is target of tab[i]
// on click of tab, get scrollLeft of slide, and scroll to it.
// use


var slideElements, navigationElements, slideWrapper;
document.addEventListener('DOMContentLoaded', function () {
  var slideElements = document.querySelectorAll('.section--explore--item');
  var slideWrapper = document.querySelector('.section--explore--inner');
  var navigationElements = document.querySelectorAll('.section--explore-navigation .links button');
  var controlElements = document.querySelectorAll('.controls button');

  if ('IntersectionObserver' in window) {
    createSlideObserver();
  }

  exploreClickHandler();
  exploreControlsHandler();

  function exploreClickHandler() {
    navigationElements.forEach(function (navigationElement, index) {
      navigationElement.addEventListener('click', function () {
        console.log(index);
        toggleControls(index);
        slideElements[index].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });
      });
    });
  }

  function exploreControlsHandler() {
    controlElements.forEach(function (controlElement) {
      controlElement.addEventListener('click', function () {
        var current = parseInt(slideWrapper.querySelector('.active').dataset.slide);
        var direction = controlElement.dataset.direction;
        var target = direction == 'forwards' ? current : current - 2;
        toggleControls(target);
        slideElements[target].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });
      });
    });
  }

  function toggleControls(index) {
    if (index < 1) {
      controlElements[1].setAttribute('disabled', true);
      controlElements[0].removeAttribute('disabled');
    } else if (index + 1 == slideElements.length) {
      controlElements[0].setAttribute('disabled', true);
      controlElements[1].removeAttribute('disabled');
    } else {
      controlElements[0].removeAttribute('disabled');
      controlElements[1].removeAttribute('disabled');
    }
  }

  function createSlideObserver() {
    var slideObserver = new IntersectionObserver(handleSlideIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: [0.5]
    });
    slideElements.forEach(function (slideElement) {
      slideObserver.observe(slideElement);
    });
  }

  function handleSlideIntersect(entries) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > 0.5) {
        entry.target.classList.add('active');
        navigationElements[entry.target.dataset.slide - 1].classList.add('active');
      } else {
        entry.target.classList.remove('active');
        navigationElements[entry.target.dataset.slide - 1].classList.remove('active');
      }
    });
  }

  (function () {
    // Get all the <h3> headings
    var headings = document.querySelectorAll('.activity-item--header');
    Array.prototype.forEach.call(headings, function (heading) {
      heading.onclick = function () {
        // Cast the state as a boolean
        var expanded = heading.getAttribute('aria-expanded') === 'true' || false; // Close all others if this one isn't open

        if (!expanded) {
          heading.parentNode.parentNode.querySelectorAll('.activity-item--content').forEach(function (node) {
            node.hidden = true;
          });
          heading.parentNode.parentNode.querySelectorAll('button').forEach(function (btn) {
            btn.setAttribute('aria-expanded', false);
          });
        } // Switch the state


        heading.setAttribute('aria-expanded', !expanded); // Switch the content's visibility

        heading.nextElementSibling.hidden = expanded;
      };
    });
  })();
});

/***/ }),

/***/ "./node_modules/intersection-observer/intersection-observer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/intersection-observer/intersection-observer.js ***!
  \*********************************************************************/
/***/ (() => {

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function() {
'use strict';

// Exit early if we're not running in a browser.
if (typeof window !== 'object') {
  return;
}

// Exit early if all IntersectionObserver and IntersectionObserverEntry
// features are natively supported.
if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/w3c/IntersectionObserver/issues/211
  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
    Object.defineProperty(window.IntersectionObserverEntry.prototype,
      'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
  return;
}


/**
 * A local reference to the document.
 */
var document = window.document;


/**
 * An IntersectionObserver registry. This registry exists to hold a strong
 * reference to IntersectionObserver instances currently observing a target
 * element. Without this registry, instances without another reference may be
 * garbage collected.
 */
var registry = [];


/**
 * Creates the global IntersectionObserverEntry constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
 * @param {Object} entry A dictionary of instance properties.
 * @constructor
 */
function IntersectionObserverEntry(entry) {
  this.time = entry.time;
  this.target = entry.target;
  this.rootBounds = entry.rootBounds;
  this.boundingClientRect = entry.boundingClientRect;
  this.intersectionRect = entry.intersectionRect || getEmptyRect();
  this.isIntersecting = !!entry.intersectionRect;

  // Calculates the intersection ratio.
  var targetRect = this.boundingClientRect;
  var targetArea = targetRect.width * targetRect.height;
  var intersectionRect = this.intersectionRect;
  var intersectionArea = intersectionRect.width * intersectionRect.height;

  // Sets intersection ratio.
  if (targetArea) {
    // Round the intersection ratio to avoid floating point math issues:
    // https://github.com/w3c/IntersectionObserver/issues/324
    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
  } else {
    // If area is zero and is intersecting, sets to 1, otherwise to 0
    this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
}


/**
 * Creates the global IntersectionObserver constructor.
 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
 * @param {Function} callback The function to be invoked after intersection
 *     changes have queued. The function is not invoked if the queue has
 *     been emptied by calling the `takeRecords` method.
 * @param {Object=} opt_options Optional configuration options.
 * @constructor
 */
function IntersectionObserver(callback, opt_options) {

  var options = opt_options || {};

  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }

  if (options.root && options.root.nodeType != 1) {
    throw new Error('root must be an Element');
  }

  // Binds and throttles `this._checkForIntersections`.
  this._checkForIntersections = throttle(
      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

  // Private properties.
  this._callback = callback;
  this._observationTargets = [];
  this._queuedEntries = [];
  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

  // Public properties.
  this.thresholds = this._initThresholds(options.threshold);
  this.root = options.root || null;
  this.rootMargin = this._rootMarginValues.map(function(margin) {
    return margin.value + margin.unit;
  }).join(' ');
}


/**
 * The minimum interval within which the document will be checked for
 * intersection changes.
 */
IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


/**
 * The frequency in which the polyfill polls for intersection changes.
 * this can be updated on a per instance basis and must be set prior to
 * calling `observe` on the first target.
 */
IntersectionObserver.prototype.POLL_INTERVAL = null;

/**
 * Use a mutation observer on the root element
 * to detect intersection changes.
 */
IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


/**
 * Starts observing a target element for intersection changes based on
 * the thresholds values.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.observe = function(target) {
  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
    return item.element == target;
  });

  if (isTargetAlreadyObserved) {
    return;
  }

  if (!(target && target.nodeType == 1)) {
    throw new Error('target must be an Element');
  }

  this._registerInstance();
  this._observationTargets.push({element: target, entry: null});
  this._monitorIntersections();
  this._checkForIntersections();
};


/**
 * Stops observing a target element for intersection changes.
 * @param {Element} target The DOM element to observe.
 */
IntersectionObserver.prototype.unobserve = function(target) {
  this._observationTargets =
      this._observationTargets.filter(function(item) {

    return item.element != target;
  });
  if (!this._observationTargets.length) {
    this._unmonitorIntersections();
    this._unregisterInstance();
  }
};


/**
 * Stops observing all target elements for intersection changes.
 */
IntersectionObserver.prototype.disconnect = function() {
  this._observationTargets = [];
  this._unmonitorIntersections();
  this._unregisterInstance();
};


/**
 * Returns any queue entries that have not yet been reported to the
 * callback and clears the queue. This can be used in conjunction with the
 * callback to obtain the absolute most up-to-date intersection information.
 * @return {Array} The currently queued entries.
 */
IntersectionObserver.prototype.takeRecords = function() {
  var records = this._queuedEntries.slice();
  this._queuedEntries = [];
  return records;
};


/**
 * Accepts the threshold value from the user configuration object and
 * returns a sorted array of unique threshold values. If a value is not
 * between 0 and 1 and error is thrown.
 * @private
 * @param {Array|number=} opt_threshold An optional threshold value or
 *     a list of threshold values, defaulting to [0].
 * @return {Array} A sorted list of unique and valid threshold values.
 */
IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
  var threshold = opt_threshold || [0];
  if (!Array.isArray(threshold)) threshold = [threshold];

  return threshold.sort().filter(function(t, i, a) {
    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
      throw new Error('threshold must be a number between 0 and 1 inclusively');
    }
    return t !== a[i - 1];
  });
};


/**
 * Accepts the rootMargin value from the user configuration object
 * and returns an array of the four margin values as an object containing
 * the value and unit properties. If any of the values are not properly
 * formatted or use a unit other than px or %, and error is thrown.
 * @private
 * @param {string=} opt_rootMargin An optional rootMargin value,
 *     defaulting to '0px'.
 * @return {Array<Object>} An array of margin objects with the keys
 *     value and unit.
 */
IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
  var marginString = opt_rootMargin || '0px';
  var margins = marginString.split(/\s+/).map(function(margin) {
    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    if (!parts) {
      throw new Error('rootMargin must be specified in pixels or percent');
    }
    return {value: parseFloat(parts[1]), unit: parts[2]};
  });

  // Handles shorthand.
  margins[1] = margins[1] || margins[0];
  margins[2] = margins[2] || margins[0];
  margins[3] = margins[3] || margins[1];

  return margins;
};


/**
 * Starts polling for intersection changes if the polling is not already
 * happening, and if the page's visibility state is visible.
 * @private
 */
IntersectionObserver.prototype._monitorIntersections = function() {
  if (!this._monitoringIntersections) {
    this._monitoringIntersections = true;

    // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.
    if (this.POLL_INTERVAL) {
      this._monitoringInterval = setInterval(
          this._checkForIntersections, this.POLL_INTERVAL);
    }
    else {
      addEvent(window, 'resize', this._checkForIntersections, true);
      addEvent(document, 'scroll', this._checkForIntersections, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in window) {
        this._domObserver = new MutationObserver(this._checkForIntersections);
        this._domObserver.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }
  }
};


/**
 * Stops polling for intersection changes.
 * @private
 */
IntersectionObserver.prototype._unmonitorIntersections = function() {
  if (this._monitoringIntersections) {
    this._monitoringIntersections = false;

    clearInterval(this._monitoringInterval);
    this._monitoringInterval = null;

    removeEvent(window, 'resize', this._checkForIntersections, true);
    removeEvent(document, 'scroll', this._checkForIntersections, true);

    if (this._domObserver) {
      this._domObserver.disconnect();
      this._domObserver = null;
    }
  }
};


/**
 * Scans each observation target for intersection changes and adds them
 * to the internal entries queue. If new entries are found, it
 * schedules the callback to be invoked.
 * @private
 */
IntersectionObserver.prototype._checkForIntersections = function() {
  var rootIsInDom = this._rootIsInDom();
  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

  this._observationTargets.forEach(function(item) {
    var target = item.element;
    var targetRect = getBoundingClientRect(target);
    var rootContainsTarget = this._rootContainsTarget(target);
    var oldEntry = item.entry;
    var intersectionRect = rootIsInDom && rootContainsTarget &&
        this._computeTargetAndRootIntersection(target, rootRect);

    var newEntry = item.entry = new IntersectionObserverEntry({
      time: now(),
      target: target,
      boundingClientRect: targetRect,
      rootBounds: rootRect,
      intersectionRect: intersectionRect
    });

    if (!oldEntry) {
      this._queuedEntries.push(newEntry);
    } else if (rootIsInDom && rootContainsTarget) {
      // If the new entry intersection ratio has crossed any of the
      // thresholds, add a new entry.
      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
        this._queuedEntries.push(newEntry);
      }
    } else {
      // If the root is not in the DOM or target is not contained within
      // root but the previous entry for this target had an intersection,
      // add a new record indicating removal.
      if (oldEntry && oldEntry.isIntersecting) {
        this._queuedEntries.push(newEntry);
      }
    }
  }, this);

  if (this._queuedEntries.length) {
    this._callback(this.takeRecords(), this);
  }
};


/**
 * Accepts a target and root rect computes the intersection between then
 * following the algorithm in the spec.
 * TODO(philipwalton): at this time clip-path is not considered.
 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
 * @param {Element} target The target DOM element
 * @param {Object} rootRect The bounding rect of the root after being
 *     expanded by the rootMargin value.
 * @return {?Object} The final intersection rect object or undefined if no
 *     intersection is found.
 * @private
 */
IntersectionObserver.prototype._computeTargetAndRootIntersection =
    function(target, rootRect) {

  // If the element isn't displayed, an intersection can't happen.
  if (window.getComputedStyle(target).display == 'none') return;

  var targetRect = getBoundingClientRect(target);
  var intersectionRect = targetRect;
  var parent = getParentNode(target);
  var atRoot = false;

  while (!atRoot) {
    var parentRect = null;
    var parentComputedStyle = parent.nodeType == 1 ?
        window.getComputedStyle(parent) : {};

    // If the parent isn't displayed, an intersection can't happen.
    if (parentComputedStyle.display == 'none') return;

    if (parent == this.root || parent == document) {
      atRoot = true;
      parentRect = rootRect;
    } else {
      // If the element has a non-visible overflow, and it's not the <body>
      // or <html> element, update the intersection rect.
      // Note: <body> and <html> cannot be clipped to a rect that's not also
      // the document rect, so no need to compute a new intersection.
      if (parent != document.body &&
          parent != document.documentElement &&
          parentComputedStyle.overflow != 'visible') {
        parentRect = getBoundingClientRect(parent);
      }
    }

    // If either of the above conditionals set a new parentRect,
    // calculate new intersection data.
    if (parentRect) {
      intersectionRect = computeRectIntersection(parentRect, intersectionRect);

      if (!intersectionRect) break;
    }
    parent = getParentNode(parent);
  }
  return intersectionRect;
};


/**
 * Returns the root rect after being expanded by the rootMargin value.
 * @return {Object} The expanded root rect.
 * @private
 */
IntersectionObserver.prototype._getRootRect = function() {
  var rootRect;
  if (this.root) {
    rootRect = getBoundingClientRect(this.root);
  } else {
    // Use <html>/<body> instead of window since scroll bars affect size.
    var html = document.documentElement;
    var body = document.body;
    rootRect = {
      top: 0,
      left: 0,
      right: html.clientWidth || body.clientWidth,
      width: html.clientWidth || body.clientWidth,
      bottom: html.clientHeight || body.clientHeight,
      height: html.clientHeight || body.clientHeight
    };
  }
  return this._expandRectByRootMargin(rootRect);
};


/**
 * Accepts a rect and expands it by the rootMargin value.
 * @param {Object} rect The rect object to expand.
 * @return {Object} The expanded rect.
 * @private
 */
IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
  var margins = this._rootMarginValues.map(function(margin, i) {
    return margin.unit == 'px' ? margin.value :
        margin.value * (i % 2 ? rect.width : rect.height) / 100;
  });
  var newRect = {
    top: rect.top - margins[0],
    right: rect.right + margins[1],
    bottom: rect.bottom + margins[2],
    left: rect.left - margins[3]
  };
  newRect.width = newRect.right - newRect.left;
  newRect.height = newRect.bottom - newRect.top;

  return newRect;
};


/**
 * Accepts an old and new entry and returns true if at least one of the
 * threshold values has been crossed.
 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
 *    particular target element or null if no previous entry exists.
 * @param {IntersectionObserverEntry} newEntry The current entry for a
 *    particular target element.
 * @return {boolean} Returns true if a any threshold has been crossed.
 * @private
 */
IntersectionObserver.prototype._hasCrossedThreshold =
    function(oldEntry, newEntry) {

  // To make comparing easier, an entry that has a ratio of 0
  // but does not actually intersect is given a value of -1
  var oldRatio = oldEntry && oldEntry.isIntersecting ?
      oldEntry.intersectionRatio || 0 : -1;
  var newRatio = newEntry.isIntersecting ?
      newEntry.intersectionRatio || 0 : -1;

  // Ignore unchanged ratios
  if (oldRatio === newRatio) return;

  for (var i = 0; i < this.thresholds.length; i++) {
    var threshold = this.thresholds[i];

    // Return true if an entry matches a threshold or if the new ratio
    // and the old ratio are on the opposite sides of a threshold.
    if (threshold == oldRatio || threshold == newRatio ||
        threshold < oldRatio !== threshold < newRatio) {
      return true;
    }
  }
};


/**
 * Returns whether or not the root element is an element and is in the DOM.
 * @return {boolean} True if the root element is an element and is in the DOM.
 * @private
 */
IntersectionObserver.prototype._rootIsInDom = function() {
  return !this.root || containsDeep(document, this.root);
};


/**
 * Returns whether or not the target element is a child of root.
 * @param {Element} target The target element to check.
 * @return {boolean} True if the target element is a child of root.
 * @private
 */
IntersectionObserver.prototype._rootContainsTarget = function(target) {
  return containsDeep(this.root || document, target);
};


/**
 * Adds the instance to the global IntersectionObserver registry if it isn't
 * already present.
 * @private
 */
IntersectionObserver.prototype._registerInstance = function() {
  if (registry.indexOf(this) < 0) {
    registry.push(this);
  }
};


/**
 * Removes the instance from the global IntersectionObserver registry.
 * @private
 */
IntersectionObserver.prototype._unregisterInstance = function() {
  var index = registry.indexOf(this);
  if (index != -1) registry.splice(index, 1);
};


/**
 * Returns the result of the performance.now() method or null in browsers
 * that don't support the API.
 * @return {number} The elapsed time since the page was requested.
 */
function now() {
  return window.performance && performance.now && performance.now();
}


/**
 * Throttles a function and delays its execution, so it's only called at most
 * once within a given time period.
 * @param {Function} fn The function to throttle.
 * @param {number} timeout The amount of time that must pass before the
 *     function can be called again.
 * @return {Function} The throttled function.
 */
function throttle(fn, timeout) {
  var timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn();
        timer = null;
      }, timeout);
    }
  };
}


/**
 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
 * @param {Node} node The DOM node to add the event handler to.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to add.
 * @param {boolean} opt_useCapture Optionally adds the even to the capture
 *     phase. Note: this only works in modern browsers.
 */
function addEvent(node, event, fn, opt_useCapture) {
  if (typeof node.addEventListener == 'function') {
    node.addEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.attachEvent == 'function') {
    node.attachEvent('on' + event, fn);
  }
}


/**
 * Removes a previously added event handler from a DOM node.
 * @param {Node} node The DOM node to remove the event handler from.
 * @param {string} event The event name.
 * @param {Function} fn The event handler to remove.
 * @param {boolean} opt_useCapture If the event handler was added with this
 *     flag set to true, it should be set to true here in order to remove it.
 */
function removeEvent(node, event, fn, opt_useCapture) {
  if (typeof node.removeEventListener == 'function') {
    node.removeEventListener(event, fn, opt_useCapture || false);
  }
  else if (typeof node.detatchEvent == 'function') {
    node.detatchEvent('on' + event, fn);
  }
}


/**
 * Returns the intersection between two rect objects.
 * @param {Object} rect1 The first rect.
 * @param {Object} rect2 The second rect.
 * @return {?Object} The intersection rect or undefined if no intersection
 *     is found.
 */
function computeRectIntersection(rect1, rect2) {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
}


/**
 * Shims the native getBoundingClientRect for compatibility with older IE.
 * @param {Element} el The element whose bounding rect to get.
 * @return {Object} The (possibly shimmed) rect of the element.
 */
function getBoundingClientRect(el) {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/w3c/IntersectionObserver/pull/205
  }

  if (!rect) return getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
}


/**
 * Returns an empty rect object. An empty rect is returned when an element
 * is not in the DOM.
 * @return {Object} The empty rect.
 */
function getEmptyRect() {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
}

/**
 * Checks to see if a parent element contains a child element (including inside
 * shadow DOM).
 * @param {Node} parent The parent element.
 * @param {Node} child The child element.
 * @return {boolean} True if the parent node contains the child node.
 */
function containsDeep(parent, child) {
  var node = child;
  while (node) {
    if (node == parent) return true;

    node = getParentNode(node);
  }
  return false;
}


/**
 * Gets the parent node of an element or its host element if the parent node
 * is a shadow root.
 * @param {Node} node The node whose parent to get.
 * @return {Node|null} The parent node or null if no parent exists.
 */
function getParentNode(node) {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }

  if (parent && parent.assignedSlot) {
    // If the parent is distributed in a <slot>, return the parent of a slot.
    return parent.assignedSlot.parentNode;
  }

  return parent;
}


// Exposes the constructors globally.
window.IntersectionObserver = IntersectionObserver;
window.IntersectionObserverEntry = IntersectionObserverEntry;

}());


/***/ }),

/***/ "./src/_resources/scss/main.scss":
/*!***************************************!*\
  !*** ./src/_resources/scss/main.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/smoothscroll-polyfill/dist/smoothscroll.js":
/*!*****************************************************************!*\
  !*** ./node_modules/smoothscroll-polyfill/dist/smoothscroll.js ***!
  \*****************************************************************/
/***/ ((module) => {

/* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
(function () {
  'use strict';

  // polyfill
  function polyfill() {
    // aliases
    var w = window;
    var d = document;

    // return if scroll behavior is supported and polyfill is not forced
    if (
      'scrollBehavior' in d.documentElement.style &&
      w.__forceSmoothScrollPolyfill__ !== true
    ) {
      return;
    }

    // globals
    var Element = w.HTMLElement || w.Element;
    var SCROLL_TIME = 468;

    // object gathering original scroll methods
    var original = {
      scroll: w.scroll || w.scrollTo,
      scrollBy: w.scrollBy,
      elementScroll: Element.prototype.scroll || scrollElement,
      scrollIntoView: Element.prototype.scrollIntoView
    };

    // define timing method
    var now =
      w.performance && w.performance.now
        ? w.performance.now.bind(w.performance)
        : Date.now;

    /**
     * indicates if a the current browser is made by Microsoft
     * @method isMicrosoftBrowser
     * @param {String} userAgent
     * @returns {Boolean}
     */
    function isMicrosoftBrowser(userAgent) {
      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

      return new RegExp(userAgentPatterns.join('|')).test(userAgent);
    }

    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

    /**
     * changes scroll position inside an element
     * @method scrollElement
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function scrollElement(x, y) {
      this.scrollLeft = x;
      this.scrollTop = y;
    }

    /**
     * returns result of applying ease math function to a number
     * @method ease
     * @param {Number} k
     * @returns {Number}
     */
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }

    /**
     * indicates if a smooth behavior should be applied
     * @method shouldBailOut
     * @param {Number|Object} firstArg
     * @returns {Boolean}
     */
    function shouldBailOut(firstArg) {
      if (
        firstArg === null ||
        typeof firstArg !== 'object' ||
        firstArg.behavior === undefined ||
        firstArg.behavior === 'auto' ||
        firstArg.behavior === 'instant'
      ) {
        // first argument is not an object/null
        // or behavior is auto, instant or undefined
        return true;
      }

      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
        // first argument is an object and behavior is smooth
        return false;
      }

      // throw error when behavior is not supported
      throw new TypeError(
        'behavior member of ScrollOptions ' +
          firstArg.behavior +
          ' is not a valid value for enumeration ScrollBehavior.'
      );
    }

    /**
     * indicates if an element has scrollable space in the provided axis
     * @method hasScrollableSpace
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function hasScrollableSpace(el, axis) {
      if (axis === 'Y') {
        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
      }

      if (axis === 'X') {
        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
      }
    }

    /**
     * indicates if an element has a scrollable overflow property in the axis
     * @method canOverflow
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function canOverflow(el, axis) {
      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

      return overflowValue === 'auto' || overflowValue === 'scroll';
    }

    /**
     * indicates if an element can be scrolled in either axis
     * @method isScrollable
     * @param {Node} el
     * @param {String} axis
     * @returns {Boolean}
     */
    function isScrollable(el) {
      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

      return isScrollableY || isScrollableX;
    }

    /**
     * finds scrollable parent of an element
     * @method findScrollableParent
     * @param {Node} el
     * @returns {Node} el
     */
    function findScrollableParent(el) {
      while (el !== d.body && isScrollable(el) === false) {
        el = el.parentNode || el.host;
      }

      return el;
    }

    /**
     * self invoked function that, given a context, steps through scrolling
     * @method step
     * @param {Object} context
     * @returns {undefined}
     */
    function step(context) {
      var time = now();
      var value;
      var currentX;
      var currentY;
      var elapsed = (time - context.startTime) / SCROLL_TIME;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      value = ease(elapsed);

      currentX = context.startX + (context.x - context.startX) * value;
      currentY = context.startY + (context.y - context.startY) * value;

      context.method.call(context.scrollable, currentX, currentY);

      // scroll more if we have not reached our destination
      if (currentX !== context.x || currentY !== context.y) {
        w.requestAnimationFrame(step.bind(w, context));
      }
    }

    /**
     * scrolls window or element with a smooth behavior
     * @method smoothScroll
     * @param {Object|Node} el
     * @param {Number} x
     * @param {Number} y
     * @returns {undefined}
     */
    function smoothScroll(el, x, y) {
      var scrollable;
      var startX;
      var startY;
      var method;
      var startTime = now();

      // define scroll context
      if (el === d.body) {
        scrollable = w;
        startX = w.scrollX || w.pageXOffset;
        startY = w.scrollY || w.pageYOffset;
        method = original.scroll;
      } else {
        scrollable = el;
        startX = el.scrollLeft;
        startY = el.scrollTop;
        method = scrollElement;
      }

      // scroll looping over a frame
      step({
        scrollable: scrollable,
        method: method,
        startTime: startTime,
        startX: startX,
        startY: startY,
        x: x,
        y: y
      });
    }

    // ORIGINAL METHODS OVERRIDES
    // w.scroll and w.scrollTo
    w.scroll = w.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scroll.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object'
              ? arguments[0]
              : w.scrollX || w.pageXOffset,
          // use top prop, second argument if present or fallback to scrollY
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined
              ? arguments[1]
              : w.scrollY || w.pageYOffset
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        arguments[0].left !== undefined
          ? ~~arguments[0].left
          : w.scrollX || w.pageXOffset,
        arguments[0].top !== undefined
          ? ~~arguments[0].top
          : w.scrollY || w.pageYOffset
      );
    };

    // w.scrollBy
    w.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0])) {
        original.scrollBy.call(
          w,
          arguments[0].left !== undefined
            ? arguments[0].left
            : typeof arguments[0] !== 'object' ? arguments[0] : 0,
          arguments[0].top !== undefined
            ? arguments[0].top
            : arguments[1] !== undefined ? arguments[1] : 0
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        w,
        d.body,
        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
      );
    };

    // Element.prototype.scroll and Element.prototype.scrollTo
    Element.prototype.scroll = Element.prototype.scrollTo = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        // if one number is passed, throw error to match Firefox implementation
        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
          throw new SyntaxError('Value could not be converted');
        }

        original.elementScroll.call(
          this,
          // use left prop, first number argument or fallback to scrollLeft
          arguments[0].left !== undefined
            ? ~~arguments[0].left
            : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
          // use top prop, second argument or fallback to scrollTop
          arguments[0].top !== undefined
            ? ~~arguments[0].top
            : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
        );

        return;
      }

      var left = arguments[0].left;
      var top = arguments[0].top;

      // LET THE SMOOTHNESS BEGIN!
      smoothScroll.call(
        this,
        this,
        typeof left === 'undefined' ? this.scrollLeft : ~~left,
        typeof top === 'undefined' ? this.scrollTop : ~~top
      );
    };

    // Element.prototype.scrollBy
    Element.prototype.scrollBy = function() {
      // avoid action when no arguments are passed
      if (arguments[0] === undefined) {
        return;
      }

      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.elementScroll.call(
          this,
          arguments[0].left !== undefined
            ? ~~arguments[0].left + this.scrollLeft
            : ~~arguments[0] + this.scrollLeft,
          arguments[0].top !== undefined
            ? ~~arguments[0].top + this.scrollTop
            : ~~arguments[1] + this.scrollTop
        );

        return;
      }

      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    };

    // Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = function() {
      // avoid smooth behavior if not required
      if (shouldBailOut(arguments[0]) === true) {
        original.scrollIntoView.call(
          this,
          arguments[0] === undefined ? true : arguments[0]
        );

        return;
      }

      // LET THE SMOOTHNESS BEGIN!
      var scrollableParent = findScrollableParent(this);
      var parentRects = scrollableParent.getBoundingClientRect();
      var clientRects = this.getBoundingClientRect();

      if (scrollableParent !== d.body) {
        // reveal element inside parent
        smoothScroll.call(
          this,
          scrollableParent,
          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
          scrollableParent.scrollTop + clientRects.top - parentRects.top
        );

        // reveal parent in viewport unless is fixed
        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
          w.scrollBy({
            left: parentRects.left,
            top: parentRects.top,
            behavior: 'smooth'
          });
        }
      } else {
        // reveal element in viewport
        w.scrollBy({
          left: clientRects.left,
          top: clientRects.top,
          behavior: 'smooth'
        });
      }
    };
  }

  if (true) {
    // commonjs
    module.exports = { polyfill: polyfill };
  } else {}

}());


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {};
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/src/assets/main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./src/_resources/js/main.js"],
/******/ 			["./src/_resources/scss/main.scss"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkturveyworld"] = self["webpackChunkturveyworld"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;