/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var Stats = React.createClass({
	  displayName: 'Stats',


	  render: function () {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'span',
	        { className: 'todo-count' },
	        React.createElement(
	          'strong',
	          null,
	          this.props.remaining
	        ),
	        ' ',
	        this.props.remaining === 1 ? 'item' : 'items',
	        ' left'
	      ),
	      React.createElement(
	        'ul',
	        { className: 'filters' },
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            'a',
	            { className: 'selected', href: '#/' },
	            'All'
	          )
	        ),
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            'a',
	            { href: '#/active' },
	            'Active'
	          )
	        ),
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            'a',
	            { href: '#/completed' },
	            'Completed'
	          )
	        )
	      ),
	      (() => {
	        if (this.props.completed) {
	          return React.createElement(
	            'button',
	            {
	              className: 'clear-completed'
	            },
	            'Clear completed'
	          );
	        }
	      })()
	    );
	  }

	});

	window.Stats = Stats;

/***/ }
/******/ ]);